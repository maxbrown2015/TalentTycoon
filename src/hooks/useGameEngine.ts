import { useCallback, useMemo, useReducer } from 'react';
import { createInitialState } from '../state/initialState';
import {
  gameReducer,
  selectAvailableActions,
  selectCurrentEvent,
  selectModifiers,
  selectPhase,
  selectResources,
  selectTimelinePercent,
  selectTurn
} from '../state/gameReducer';
import { GameAction, GameState } from '../types/game';

export const useGameEngine = () => {
  const [state, dispatch] = useReducer(gameReducer, undefined, createInitialState);

  const phase = useMemo(() => selectPhase(state), [state]);
  const actions = useMemo(() => selectAvailableActions(state), [state]);
  const resources = useMemo(() => selectResources(state), [state]);
  const modifiers = useMemo(() => selectModifiers(state), [state]);
  const currentEvent = useMemo(() => selectCurrentEvent(state), [state]);
  const turn = useMemo(() => selectTurn(state), [state]);
  const timelinePercent = useMemo(() => selectTimelinePercent(state), [state]);

  const send = useCallback((action: GameAction) => dispatch(action), []);

  const selectAction = useCallback(
    (actionId: string) => dispatch({ type: 'SELECT_ACTION', actionId }),
    []
  );

  const commitActions = useCallback(() => dispatch({ type: 'COMMIT_ACTIONS' }), []);

  const resolveEvent = useCallback(
    (optionId?: string) => {
      if (!state.currentEvent) {
        dispatch({ type: 'RESOLVE_EVENT' });
        return;
      }

      if (!optionId) {
        return;
      }

      const option = state.currentEvent.card.options.find((item) => item.id === optionId);
      if (!option) return;
      dispatch({ type: 'RESOLVE_EVENT', optionId, option });
    },
    [state.currentEvent]
  );

  const restartGame = useCallback(() => dispatch({ type: 'RESET_GAME' }), []);

  return {
    state,
    phase,
    actions,
    resources,
    modifiers,
    currentEvent,
    turn,
    timelinePercent,
    dispatch: send,
    selectAction,
    commitActions,
    resolveEvent,
    restartGame
  };
};
