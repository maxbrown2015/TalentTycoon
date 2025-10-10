import { GameState } from '../types/game';

const STARTING_RESOURCES = {
  budget: 5_000_000,
  openRoles: 25
};

export interface ScoreBreakdown {
  hiringCoverage: number;
  velocity: number;
  morale: number;
  budgetDiscipline: number;
  composite: number;
  verdict: 'Bronze' | 'Silver' | 'Gold' | 'Needs Work';
}

const clamp = (value: number, min = 0, max = 100) =>
  Math.max(min, Math.min(max, Math.round(value)));

export const evaluateFinalState = (state: GameState): ScoreBreakdown => {
  const { resources } = state;
  const hiringCoverage =
    resources.openRoles <= 0
      ? 100
      : clamp((1 - resources.openRoles / STARTING_RESOURCES.openRoles) * 100);

  const moraleScore = clamp(resources.morale);
  const velocityScore = clamp(resources.velocity);
  const budgetDelta = resources.budget - STARTING_RESOURCES.budget;
  const budgetDiscipline = clamp(60 + (budgetDelta / STARTING_RESOURCES.budget) * 80, 0, 100);

  const composite = clamp(
    hiringCoverage * 0.35 + velocityScore * 0.3 + moraleScore * 0.2 + budgetDiscipline * 0.15
  );

  let verdict: ScoreBreakdown['verdict'] = 'Needs Work';
  if (composite >= 85) verdict = 'Gold';
  else if (composite >= 70) verdict = 'Silver';
  else if (composite >= 55) verdict = 'Bronze';

  return {
    hiringCoverage,
    morale: moraleScore,
    velocity: velocityScore,
    budgetDiscipline,
    composite,
    verdict
  };
};
