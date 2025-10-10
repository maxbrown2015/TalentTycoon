import { EVENT_DECK } from '../data/events';
import { createInitialState } from './initialState';
import {
  Effect,
  GAME_SETTINGS,
  GameAction,
  GameModifiers,
  GamePhase,
  GameState,
  ResourceKey,
  ResourceSnapshot,
  TurnRecord,
  EventOutcome
} from '../types/game';
import { createSeededRng, pickWeighted } from '../utils/random';

const RESOURCE_BOUNDS: Record<ResourceKey, { min: number; max: number }> = {
  budget: { min: -2_000_000, max: 10_000_000 },
  openRoles: { min: 0, max: 120 },
  pipeline: { min: 0, max: 100 },
  timeToFill: { min: 30, max: 90 },
  morale: { min: 0, max: 100 },
  velocity: { min: 0, max: 100 }
};

const MODIFIER_WEIGHT_THRESHOLDS: Record<
  keyof GameModifiers,
  { high: number; low: number }
> = {
  reputation: { high: 18, low: 6 },
  marketHeat: { high: 18, low: 8 },
  processDebt: { high: 24, low: 10 }
};

const clampResource = (key: ResourceKey, value: number) => {
  const bounds = RESOURCE_BOUNDS[key];
  const min = bounds.min;
  const max = bounds.max;
  if (value < min) return min;
  if (value > max) return max;
  return Number.isFinite(value) ? value : min;
};

const getEffectiveResourceValue = (state: GameState, key: ResourceKey) => {
  const pending = state.pendingResourceDeltas?.[key] ?? 0;
  return clampResource(key, state.resources[key] + pending);
};

const getEffectiveModifierValue = (state: GameState, key: keyof GameModifiers) => {
  const pending = state.pendingModifierDeltas?.[key] ?? 0;
  return Math.max(0, Math.round((state.modifiers[key] + pending) * 100) / 100);
};

const getEffectiveResourcesSnapshot = (state: GameState): ResourceSnapshot => {
  const snapshot: ResourceSnapshot = { ...state.resources };
  (Object.keys(snapshot) as ResourceKey[]).forEach((key) => {
    snapshot[key] = getEffectiveResourceValue(state, key);
  });
  return snapshot;
};

const getEffectiveModifiersSnapshot = (state: GameState): GameModifiers => {
  const snapshot: GameModifiers = { ...state.modifiers };
  (Object.keys(snapshot) as Array<keyof GameModifiers>).forEach((key) => {
    snapshot[key] = getEffectiveModifierValue(state, key);
  });
  return snapshot;
};

const getStateWithEffectiveValues = (state: GameState): GameState => ({
  ...state,
  resources: getEffectiveResourcesSnapshot(state),
  modifiers: getEffectiveModifiersSnapshot(state)
});

const applyEffects = (state: GameState, effects: Effect[]): GameState => {
  if (!effects.length) {
    return state;
  }

  const next: GameState = {
    ...state,
    resources: { ...state.resources },
    modifiers: { ...state.modifiers },
    pendingResourceDeltas: { ...(state.pendingResourceDeltas ?? {}) },
    pendingModifierDeltas: { ...(state.pendingModifierDeltas ?? {}) }
  };

  for (const effect of effects) {
    if (effect.kind === 'resource') {
      for (const [resourceKey, delta] of Object.entries(effect.delta)) {
        const key = resourceKey as ResourceKey;
        const current = next.pendingResourceDeltas[key] ?? 0;
        const accumulated = Math.round((current + (delta ?? 0)) * 100) / 100;
        if (accumulated !== 0) {
          next.pendingResourceDeltas[key] = accumulated;
        } else {
          delete next.pendingResourceDeltas[key];
        }
      }
    } else if (effect.kind === 'modifier') {
      for (const [modifierKey, delta] of Object.entries(effect.delta)) {
        const key = modifierKey as keyof GameModifiers;
        const current = next.pendingModifierDeltas[key] ?? 0;
        const adjustment = Math.round(((delta ?? 0) + current) * 100) / 100;
        next.pendingModifierDeltas[key] = adjustment;
      }
    }
  }

  return next;
};

const advancePhase = (phase: GamePhase): GamePhase => {
  switch (phase) {
    case 'planning':
      return 'event';
    case 'event':
      return 'planning';
    default:
      return 'complete';
  }
};

const shuffleIds = (ids: string[], rng: () => number) => {
  const arr = [...ids];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const clampWeightShift = (shift: number) => {
  if (!Number.isFinite(shift)) {
    return 0;
  }
  const capped = Math.max(-0.05, Math.min(0.05, shift));
  return capped;
};

const applyPendingResources = (state: GameState): GameState => {
  const pending = state.pendingResourceDeltas ?? {};
  const entries = Object.entries(pending) as Array<[ResourceKey, number | undefined]>;

  if (!entries.length) {
    return state;
  }

  let changed = false;
  const updatedResources: ResourceSnapshot = { ...state.resources };

  entries.forEach(([key, delta]) => {
    if (!delta) {
      return;
    }
    const current = updatedResources[key];
    const nextValue = clampResource(key, current + delta);
    if (nextValue !== current) {
      updatedResources[key] = Math.round(nextValue * 100) / 100;
      changed = true;
    }
  });

  return {
    ...state,
    resources: changed ? updatedResources : state.resources,
    pendingResourceDeltas: {}
  };
};

const applyPendingModifiers = (state: GameState): GameState => {
  const pending = state.pendingModifierDeltas ?? {};
  const entries = Object.entries(pending ?? {}) as Array<[
    keyof GameModifiers,
    number | undefined
  ]>;

  if (!entries.length) {
    return state;
  }

  let changed = false;
  let hasNonZero = false;
  const updatedModifiers = { ...state.modifiers };

  entries.forEach(([key, delta]) => {
    if (!delta) {
      return;
    }
    hasNonZero = true;
    const current = updatedModifiers[key];
    const nextValue = Math.max(0, Math.round((current + delta) * 100) / 100);
    if (nextValue !== current) {
      updatedModifiers[key] = nextValue;
      changed = true;
    }
  });

  if (!hasNonZero) {
    return {
      ...state,
      pendingModifierDeltas: {}
    };
  }

  return {
    ...state,
    modifiers: changed ? updatedModifiers : state.modifiers,
    pendingModifierDeltas: {}
  };
};

const adjustOutcomesForModifiers = (outcomes: EventOutcome[], modifiers: GameModifiers) =>
  outcomes.map((outcome) => {
    if (!outcome.weightTweaks?.length) {
      return outcome;
    }

    let adjustedWeight = outcome.weight;

    for (const tweak of outcome.weightTweaks) {
      const thresholds = MODIFIER_WEIGHT_THRESHOLDS[tweak.metric];
      const metricValue = modifiers[tweak.metric];
      const threshold =
        tweak.threshold ??
        (thresholds ? thresholds[tweak.when] : tweak.when === 'high' ? 18 : 6);

      const condition =
        tweak.when === 'high' ? metricValue >= threshold : metricValue <= threshold;

      if (condition) {
        const shift = clampWeightShift(tweak.shift);
        adjustedWeight = Math.max(0.0001, adjustedWeight * (1 + shift));
      }
    }

    if (adjustedWeight === outcome.weight) {
      return outcome;
    }

    return {
      ...outcome,
      weight: adjustedWeight
    };
  });

const applyOngoingEffects = (state: GameState): GameState => {
  if (!state.activeEffects.length) {
    return state;
  }

  let nextState: GameState = { ...state };
  const updatedEffects: GameState['activeEffects'] = [];

  for (const effect of state.activeEffects) {
    nextState = applyEffects(nextState, effect.perTurn);
    const remainingDuration = effect.remainingDuration - 1;
    if (remainingDuration > 0) {
      updatedEffects.push({
        ...effect,
        remainingDuration
      });
    }
  }

  return {
    ...nextState,
    activeEffects: updatedEffects
  };
};

const drawEvent = (state: GameState): GameState => {
  const ensureUnusedPool = () => {
    if (state.unusedEventIds.length > 0) {
      return state;
    }
    const rng = createSeededRng(state.seed + state.turn * 379);
    return {
      ...state,
      unusedEventIds: shuffleIds(EVENT_DECK.map((event) => event.id), rng),
      usedEventIds: []
    };
  };

  const preparedState = ensureUnusedPool();
  const rng = createSeededRng(preparedState.seed + preparedState.turn * 173);
  const unusedSet = new Set(preparedState.unusedEventIds);

  const effectiveState = getStateWithEffectiveValues(preparedState);

  const eligibleEvents = EVENT_DECK.filter((event) => {
    if (!unusedSet.has(event.id)) {
      return false;
    }
    if (event.minTurn && preparedState.turn < event.minTurn) {
      return false;
    }
    if (event.maxTurn && preparedState.turn > event.maxTurn) {
      return false;
    }
    if (typeof event.trigger === 'function' && !event.trigger(effectiveState)) {
      return false;
    }
    return true;
  });

  if (!eligibleEvents.length) {
    return {
      ...preparedState,
      currentEvent: undefined
    };
  }

  const card = pickWeighted(eligibleEvents, rng);

  if (!card) {
    return {
      ...preparedState,
      currentEvent: undefined
    };
  }

  return {
    ...preparedState,
    currentEvent: {
      card,
      resolved: false
    },
    unusedEventIds: preparedState.unusedEventIds.filter((id) => id !== card.id),
    usedEventIds: [...preparedState.usedEventIds, card.id]
  };
};

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'ADVANCE_PHASE': {
      const nextPhase = action.phase ?? advancePhase(state.phase);
      if (nextPhase === 'event' && state.phase === 'planning') {
        return drawEvent({ ...state, phase: nextPhase });
      }
      return {
        ...state,
        phase: nextPhase
      };
    }
    case 'SET_PHASE': {
      return {
        ...state,
        phase: action.phase
      };
    }
    case 'SELECT_ACTION': {
      if (state.selectedActionIds.includes(action.actionId)) {
        return {
          ...state,
          selectedActionIds: state.selectedActionIds.filter((id) => id !== action.actionId)
        };
      }

      const nextSelected = state.selectedActionIds.length >= GAME_SETTINGS.maxActionsPerTurn
        ? [action.actionId]
        : [...state.selectedActionIds, action.actionId];

      return {
        ...state,
        selectedActionIds: nextSelected
      };
    }
    case 'RESET_SELECTIONS': {
      return {
        ...state,
        selectedActionIds: []
      };
    }
    case 'COMMIT_ACTIONS': {
      if (!state.selectedActionIds.length) {
        return state;
      }

      let nextState = { ...state };
      const newActiveEffects = [...state.activeEffects];

      for (const actionId of state.selectedActionIds) {
        const card = state.availableActions.find((item) => item.id === actionId);
        if (!card) continue;

        nextState = applyEffects(nextState, card.effects);

        if (card.ongoing) {
          newActiveEffects.push({
            actionId: card.id,
            remainingDuration: card.ongoing.duration,
            perTurn: card.ongoing.perTurn
          });
        }
      }

      const readyForEvent: GameState = {
        ...nextState,
        activeEffects: newActiveEffects,
        selectedActionIds: [],
        phase: 'event',
        lastCommittedActions: [...state.selectedActionIds]
      };

      return drawEvent(readyForEvent);
    }
    case 'APPLY_EFFECTS': {
      return applyEffects(state, action.effects);
    }
    case 'TRIGGER_EVENT': {
      return {
        ...state,
        currentEvent: {
          card: action.event,
          resolved: false
        },
        phase: 'event'
      };
    }
    case 'RESOLVE_EVENT': {
      if (!state.currentEvent || !action.option || !action.optionId) {
        const resolvedState: GameState = {
          ...state,
          currentEvent: state.currentEvent
            ? { ...state.currentEvent, resolved: true }
            : undefined
        };

        const withOngoingApplied = applyOngoingEffects(resolvedState);
        const withResourcesApplied = applyPendingResources(withOngoingApplied);
        const withModifiersApplied = applyPendingModifiers(withResourcesApplied);
        const record: TurnRecord = {
          turn: withModifiersApplied.turn,
          selectedActionIds: state.lastCommittedActions,
          eventId: state.currentEvent?.card.id,
          eventOptionId: action.optionId ?? 'no-event',
          eventOutcomeId: 'no-event',
          eventOutcomeLabel: 'No Curveball',
          eventOutcomeDescription: 'No curveball this quarter — phew.',
          eventOutcomeTone: 'neutral',
          eventEffects: [],
          resourceSnapshot: { ...withModifiersApplied.resources }
        };

        const nextTurn = withModifiersApplied.turn + 1;
        const reachedEnd = nextTurn > GAME_SETTINGS.maxTurns;

        return {
          ...withModifiersApplied,
          turn: reachedEnd ? withModifiersApplied.turn : nextTurn,
          history: [...withModifiersApplied.history, record],
          currentEvent: undefined,
          phase: reachedEnd ? 'complete' : 'planning',
          gameOver: reachedEnd,
          lastCommittedActions: [],
          selectedActionIds: []
        };
      }

      const baseEffects = action.option.effects ?? [];
      let nextState = applyEffects(state, baseEffects);
      let appliedEffects: Effect[] = [...baseEffects];

      let outcomeId: string | undefined;
      let outcomeLabel: string | undefined;
      let outcomeDescription: string | undefined;
      let outcomeTone: 'success' | 'failure' | 'neutral' = 'neutral';

      if (action.option.outcomes && action.option.outcomes.length) {
        const optionSeed = [...action.optionId].reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const rng = createSeededRng(state.seed + state.turn * 997 + optionSeed * 131);
        const adjustedOutcomes = adjustOutcomesForModifiers(
          action.option.outcomes,
          getEffectiveModifiersSnapshot(state)
        );
        const outcome = pickWeighted(adjustedOutcomes, rng) ?? adjustedOutcomes[0];
        outcomeId = outcome.id;
        outcomeLabel = outcome.label;
        outcomeDescription = outcome.description;
        outcomeTone = outcome.tone ?? 'neutral';
        if (outcome.effects?.length) {
          appliedEffects = appliedEffects.concat(outcome.effects);
          nextState = applyEffects(nextState, outcome.effects);
        }
      } else if (action.option.successTest) {
        const { resource, threshold, comparison = 'gte', successEffects = [], failureEffects = [] } =
          action.option.successTest;

        const isResourceMetric = Object.prototype.hasOwnProperty.call(state.resources, resource);
        const metricValue = isResourceMetric
          ? getEffectiveResourceValue(nextState, resource as ResourceKey)
          : getEffectiveModifierValue(nextState, resource as keyof GameModifiers);

        const isSuccess = comparison === 'gte' ? metricValue >= threshold : metricValue <= threshold;
        const branchEffects = isSuccess ? successEffects : failureEffects;
        outcomeTone = isSuccess ? 'success' : 'failure';
        outcomeLabel = isSuccess ? 'Success' : 'Backfired';
        if (branchEffects.length) {
          appliedEffects = appliedEffects.concat(branchEffects);
          nextState = applyEffects(nextState, branchEffects);
        }
      }

      if (!outcomeLabel) {
        outcomeLabel = action.option.label;
      }
      if (!outcomeDescription) {
        outcomeDescription = action.option.description;
      }
      if (!outcomeId) {
        outcomeId = action.optionId;
      }

      const resolvedState: GameState = {
        ...nextState,
        currentEvent: nextState.currentEvent
          ? { ...nextState.currentEvent, resolved: true }
          : undefined
      };

      const withOngoingApplied = applyOngoingEffects(resolvedState);
      const withResourcesApplied = applyPendingResources(withOngoingApplied);
      const withModifiersApplied = applyPendingModifiers(withResourcesApplied);
      const record = {
        turn: withModifiersApplied.turn,
        selectedActionIds: state.lastCommittedActions,
        eventId: state.currentEvent?.card.id,
        eventOptionId: action.optionId,
        eventOutcomeId: outcomeId,
        eventOutcomeLabel: outcomeLabel,
        eventOutcomeDescription: outcomeDescription,
        eventOutcomeTone: outcomeTone,
        eventEffects: appliedEffects,
        resourceSnapshot: { ...withModifiersApplied.resources }
      } as TurnRecord;

      const nextTurn = withModifiersApplied.turn + 1;
      const reachedEnd = nextTurn > GAME_SETTINGS.maxTurns;

      return {
        ...withModifiersApplied,
        turn: reachedEnd ? withModifiersApplied.turn : nextTurn,
        history: [...withModifiersApplied.history, record],
        currentEvent: undefined,
        phase: reachedEnd ? 'complete' : 'planning',
        gameOver: reachedEnd,
        lastCommittedActions: [],
        selectedActionIds: []
      };
    }
    case 'COMPLETE_TURN': {
      const withOngoingApplied = applyOngoingEffects(state);
      const withResourcesApplied = applyPendingResources(withOngoingApplied);
      const withModifiersApplied = applyPendingModifiers(withResourcesApplied);
      const record = {
        turn: withModifiersApplied.turn,
        selectedActionIds: state.lastCommittedActions,
        eventId: state.currentEvent?.card.id,
        resourceSnapshot: { ...withModifiersApplied.resources }
      };

      const nextTurn = withModifiersApplied.turn + 1;
      const reachedEnd = nextTurn > GAME_SETTINGS.maxTurns;

      return {
        ...withModifiersApplied,
        turn: reachedEnd ? withModifiersApplied.turn : nextTurn,
        history: [...withModifiersApplied.history, record],
        currentEvent: undefined,
        phase: reachedEnd ? 'complete' : 'planning',
        gameOver: reachedEnd,
        lastCommittedActions: [],
        selectedActionIds: []
      };
    }
    case 'END_GAME': {
      return {
        ...state,
        phase: 'complete',
        gameOver: true
      };
    }
    case 'RESET_GAME': {
      return createInitialState();
    }
    default:
      return state;
  }
};

export const selectAvailableActions = (state: GameState) => state.availableActions;

export const selectCurrentEvent = (state: GameState) => state.currentEvent;

export const selectPhase = (state: GameState) => state.phase;

export const selectResources = (state: GameState) => state.resources;

export const selectModifiers = (state: GameState) => state.modifiers;

export const selectTurn = (state: GameState) => state.turn;

export const selectCanAdvance = (state: GameState) => {
  if (state.phase === 'planning') {
    return state.selectedActionIds.length > 0;
  }
  return true;
};

export const selectTimelinePercent = (state: GameState) =>
  Math.round(((state.turn - 1) / GAME_SETTINGS.maxTurns) * 100);
