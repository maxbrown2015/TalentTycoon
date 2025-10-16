import { evaluateFinalState } from '../utils/scoring';
import { GameState } from '../types/game';

interface EndgameReportProps {
  state: GameState;
  onRestart?: () => void;
}

type EndingVerdict = 'Fired' | 'Stay the Course' | 'Promoted';

const verdictDescriptions: Record<EndingVerdict, string> = {
  Fired:
    'The board and exec team lose confidence. Gaps in velocity, morale, or budget discipline end your run.',
  'Stay the Course':
    'Steady delivery with visible wins. Keep the plan, tune risk, and continue building reputation.',
  Promoted:
    'You exceeded expectations—velocity, morale, and budget in harmony. Scope expands and a bigger seat follows.'
};

const verdictDialogues: Record<
  EndingVerdict,
  { epilogue: string[]; suggestionsTitle?: string; suggestions?: string[] }
> = {
  Fired: {
    epilogue: [
      'Quinn (CEO): “We needed consistency under pressure. Let’s make this transition clean and respectful—thank you for the push you gave the org.”',
      'CFO: “Runway jitter came from surprise swings. A steadier glidepath on spend would have bought patience.”',
      'Head of Eng: “We’ll fold your best practices into the playbook. Hand-off notes appreciated—people remember how exits are handled.”'
    ],
    suggestionsTitle: 'Postmortem Focus',
    suggestions: [
      'Stabilise velocity: fewer big bets, more compounding wins.',
      'Pre-commit budget envelopes and communicate tradeoffs early.',
      'Codify hiring signals to reduce rework and late-stage churn.'
    ]
  },
  'Stay the Course': {
    epilogue: [
      'Quinn (CEO): “Good quarter-over-quarter discipline. Keep teaching managers to coach—not escalate.”',
      'CFO: “Your budget notes held up in review. Keep the buffer; markets are twitchy.”',
      'Head of Eng: “Interviews felt calmer and faster. Let’s tighten role scoping another turn.”'
    ],
    suggestionsTitle: 'Sharpen for Next Cycle',
    suggestions: [
      'Advance offer-accept rate with earlier closing signals.',
      'Trim time-to-fill by standardising loops and checklists.',
      'Shift 10–15% of spend to durable automation over headcount.'
    ]
  },
  Promoted: {
    epilogue: [
      'Quinn (CEO): “You set the bar. I want you owning People & Ops cross-functionally—design for scale.”',
      'Board Chair: “Velocity, morale, and burn in balance. Extend this operating cadence beyond Talent.”',
      'Head of Eng: “Roadmaps moved because recruiting did. Keep the signal high while we grow.”'
    ],
    suggestionsTitle: 'New Mandate',
    suggestions: [
      'Institutionalise the hiring playbook across business units.',
      'Build succession benches; protect velocity from single-points-of-failure.',
      'Publish a quarterly talent letter to align execs and board.'
    ]
  }
};

export const EndgameReport = ({ state, onRestart }: EndgameReportProps) => {
  const breakdown = evaluateFinalState(state);

  return (
    <section className="card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h2 style={{ margin: '0 0 12px', fontSize: 20 }}>Performance Review Summary</h2>
      <div style={{ fontSize: 48, fontWeight: 800, marginBottom: 12 }}>{breakdown.verdict}</div>
      <p style={{ margin: '0 0 16px', opacity: 0.8 }}>
        {verdictDescriptions[breakdown.verdict]}
      </p>
      {/* Rich dialogue / epilogue */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          padding: 12,
          borderRadius: 10,
          border: '1px solid rgba(148,163,184,0.28)',
          background: 'rgba(15, 23, 42, 0.5)'
        }}
      >
        {verdictDialogues[breakdown.verdict].epilogue.map((line, idx) => (
          <p key={idx} style={{ margin: 0, lineHeight: 1.5 }}>{line}</p>
        ))}
      </div>
      {verdictDialogues[breakdown.verdict].suggestions && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            padding: 12,
            borderRadius: 10,
            border: '1px solid rgba(148,163,184,0.28)',
            background: 'rgba(15, 23, 42, 0.35)'
          }}
        >
          {verdictDialogues[breakdown.verdict].suggestionsTitle && (
            <div style={{ fontSize: 12, opacity: 0.7, textTransform: 'uppercase' }}>
              {verdictDialogues[breakdown.verdict].suggestionsTitle}
            </div>
          )}
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {verdictDialogues[breakdown.verdict].suggestions!.map((item, i) => (
              <li key={i} style={{ margin: '4px 0' }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
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
