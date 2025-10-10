export type GamePhase = 'planning' | 'event' | 'complete';

export type ActionCategory = 'Hiring' | 'Operations' | 'Culture' | 'Strategic';

export interface ResourceSnapshot {
  budget: number;
  openRoles: number;
  pipeline: number;
  timeToFill: number;
  morale: number;
  velocity: number;
}

export type ResourceKey = keyof ResourceSnapshot;

export interface GameModifiers {
  reputation: number;
  marketHeat: number;
  processDebt: number;
}

export interface ResourceEffect {
  kind: 'resource';
  description?: string;
  delta: Partial<Record<ResourceKey, number>>;
}

export interface ModifierEffect {
  kind: 'modifier';
  description?: string;
  delta: Partial<Record<'reputation' | 'marketHeat' | 'processDebt', number>>;
}

export type Effect = ResourceEffect | ModifierEffect;

export interface ActionCard {
  id: string;
  name: string;
  category: ActionCategory;
  cost: number;
  description: string;
  risk: 'low' | 'medium' | 'high';
  effects: Effect[];
  ongoing?: {
    duration: number;
    perTurn: Effect[];
  };
  maxSelections?: number;
  availabilityCondition?: (state: GameState) => boolean;
}

export type SuccessMetric = ResourceKey | keyof GameModifiers;

export interface EventOption {
  id: string;
  label: string;
  description: string;
  effects: Effect[];
  outcomes?: EventOutcome[];
  successTest?: {
    resource: SuccessMetric;
    threshold: number;
    successEffects: Effect[];
    failureEffects: Effect[];
    comparison?: 'gte' | 'lte';
  };
}

export interface EventOutcome {
  id: string;
  label: string;
  description?: string;
  weight: number;
  tone?: 'success' | 'failure' | 'neutral';
  effects: Effect[];
  weightTweaks?: OutcomeWeightTweak[];
}

export interface OutcomeWeightTweak {
  metric: keyof GameModifiers;
  when: 'high' | 'low';
  shift: number;
  threshold?: number;
}

export interface EventCard {
  id: string;
  name: string;
  summary: string;
  weight: number;
  minTurn?: number;
  maxTurn?: number;
  trigger?: (state: GameState) => boolean;
  options: EventOption[];
}

export interface ActiveEvent {
  card: EventCard;
  resolved?: boolean;
}

export interface TurnRecord {
  turn: number;
  selectedActionIds: string[];
  eventId?: string;
  eventOptionId?: string;
  eventOutcomeId?: string;
  eventOutcomeLabel?: string;
  eventOutcomeDescription?: string;
  eventOutcomeTone?: 'success' | 'failure' | 'neutral';
  eventEffects?: Effect[];
  resourceSnapshot: ResourceSnapshot;
  notes?: string;
}

export interface GameState {
  turn: number;
  phase: GamePhase;
  resources: ResourceSnapshot;
  modifiers: GameModifiers;
  pendingResourceDeltas: Partial<Record<ResourceKey, number>>;
  pendingModifierDeltas: Partial<GameModifiers>;
  selectedActionIds: string[];
  availableActions: ActionCard[];
  activeEffects: Array<{
    actionId: string;
    remainingDuration: number;
    perTurn: Effect[];
  }>;
  eventSchedule: boolean[];
  unusedEventIds: string[];
  usedEventIds: string[];
  currentEvent?: ActiveEvent;
  history: TurnRecord[];
  achievements: string[];
  seed: number;
  gameOver: boolean;
  lastCommittedActions: string[];
}

export type GameAction =
  | { type: 'ADVANCE_PHASE'; phase?: GamePhase }
  | { type: 'SELECT_ACTION'; actionId: string }
  | { type: 'RESET_SELECTIONS' }
  | { type: 'COMMIT_ACTIONS' }
  | { type: 'APPLY_EFFECTS'; effects: Effect[] }
  | { type: 'TRIGGER_EVENT'; event: EventCard }
  | { type: 'RESOLVE_EVENT'; optionId?: string; option?: EventOption; success?: boolean }
  | { type: 'COMPLETE_TURN' }
  | { type: 'END_GAME' }
  | { type: 'SET_PHASE'; phase: GamePhase }
  | { type: 'RESET_GAME' };

export interface GameSettings {
  maxTurns: number;
  maxActionsPerTurn: number;
}

export const GAME_SETTINGS: GameSettings = {
  maxTurns: 16,
  maxActionsPerTurn: 1
};
