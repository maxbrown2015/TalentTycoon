import { evaluateFinalState } from '../utils/scoring';
import { GameState } from '../types/game';

interface EndgameReportProps {
  state: GameState;
  onRestart?: () => void;
}

const verdictDescriptions: Record<string, string> = {
  Gold: 'You balanced hiring velocity, morale, and budget across the full vesting horizon.',
  Silver: 'Solid execution with a few rough edges. Tighter bets next cycle will keep vesting momentum.',
  Bronze: 'You hit some targets, but the org is craving more stability before the next grant.',
  'Needs Work': 'Equity vested, but the org feels stretched. Revisit your portfolio of actions and risk appetite.'
};

export const EndgameReport = ({ state, onRestart }: EndgameReportProps) => {
  const breakdown = evaluateFinalState(state);

  return (
    <section className="card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h2 style={{ margin: '0 0 12px', fontSize: 20 }}>Four-Year Vesting Review</h2>
      <div style={{ fontSize: 48, fontWeight: 800, marginBottom: 12 }}>{breakdown.verdict}</div>
      <p style={{ margin: '0 0 16px', opacity: 0.8 }}>
        {verdictDescriptions[breakdown.verdict]}
      </p>
      <div
        style={{
          display: 'grid',
          gap: 12,
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))'
        }}
      >
        <ScoreCard label="Hiring Coverage" value={breakdown.hiringCoverage} />
        <ScoreCard label="Velocity" value={breakdown.velocity} />
        <ScoreCard label="Morale" value={breakdown.morale} />
        <ScoreCard label="Budget Discipline" value={breakdown.budgetDiscipline} />
        <ScoreCard label="Composite Score" value={breakdown.composite} highlight />
      </div>
      {onRestart && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
          <button className="primary-action" onClick={onRestart} style={{ minWidth: 220 }}>
            Play Again
          </button>
        </div>
      )}
    </section>
  );
};

const ScoreCard = ({
  label,
  value,
  highlight
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) => (
  <div
    style={{
      padding: 16,
      borderRadius: 12,
      border: `1px solid ${highlight ? '#38bdf8' : 'rgba(148, 163, 184, 0.28)'}`,
      background: highlight ? 'rgba(56, 189, 248, 0.12)' : 'rgba(15, 23, 42, 0.6)'
    }}
  >
    <div style={{ fontSize: 12, textTransform: 'uppercase', opacity: 0.65 }}>{label}</div>
    <div style={{ fontSize: 28, fontWeight: 700 }}>{value}</div>
  </div>
);
