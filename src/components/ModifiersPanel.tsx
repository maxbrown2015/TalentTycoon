import { GameModifiers } from '../types/game';

interface ModifiersPanelProps {
  modifiers: GameModifiers;
}

export const ModifiersPanel = ({ modifiers }: ModifiersPanelProps) => {
  return (
    <section className="card subtle-card">
      <h2 style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 700 }}>Forces at Play</h2>
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
        {Object.entries(modifiers).map(([key, value]) => (
          <div key={key}>
            <div style={{ fontSize: 12, textTransform: 'uppercase', opacity: 0.65 }}>
              {key.replace(/([A-Z])/g, ' $1')}
            </div>
            <div
              style={{
                height: 6,
                borderRadius: 4,
                background: 'rgba(148, 163, 184, 0.22)',
                overflow: 'hidden',
                margin: '8px 0'
              }}
            >
              <div
                style={{
                  width: `${Math.min(100, value)}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #38bdf8, #818cf8)',
                  transition: 'width 0.3s ease'
                }}
              />
            </div>
            <span style={{ fontWeight: 600 }}>{Math.round(value)}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
