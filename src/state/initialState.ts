import { ACTION_CATALOG } from '../data/actions';
import { EVENT_DECK } from '../data/events';
import { GAME_SETTINGS, GameModifiers, GameState, ResourceSnapshot } from '../types/game';

const INITIAL_RESOURCES: ResourceSnapshot = {
  budget: 5_000_000,
  openRoles: 25,
  pipeline: 55,
  timeToFill: 52,
  morale: 65,
  velocity: 55
};

const INITIAL_MODIFIERS: GameModifiers = {
  reputation: 8,
  marketHeat: 10,
  processDebt: 15
};

const SEED = Math.floor(Math.random() * 1_000_000);

const shuffleArray = <T,>(input: T[]): T[] => {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const generateEventSchedule = (turns: number): boolean[] => new Array(turns).fill(true);

export const createInitialState = (): GameState => ({
  turn: 1,
  phase: 'planning',
  resources: { ...INITIAL_RESOURCES },
  modifiers: { ...INITIAL_MODIFIERS },
  pendingResourceDeltas: {},
  pendingModifierDeltas: {},
  selectedActionIds: [],
  availableActions: ACTION_CATALOG,
  activeEffects: [],
  history: [],
  achievements: [],
  seed: SEED,
  gameOver: false,
  lastCommittedActions: [],
  eventSchedule: generateEventSchedule(GAME_SETTINGS.maxTurns),
  unusedEventIds: shuffleArray(EVENT_DECK.map((event) => event.id)),
  usedEventIds: []
});

export const SETTINGS = GAME_SETTINGS;
