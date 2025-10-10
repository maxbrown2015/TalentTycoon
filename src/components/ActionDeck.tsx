import { ActionCard } from '../types/game';
import { formatBudgetValue } from '../utils/format';

interface ActionDeckProps {
  actions: ActionCard[];
  selectedIds: string[];
  onToggle: (actionId: string) => void;
  disabled?: boolean;
  cooldowns?: Map<string, number>;
  maxSelections: number;
}

const riskColor: Record<ActionCard['risk'], string> = {
  low: '#22c55e',
  medium: '#eab308',
  high: '#ef4444'
};

export const ActionDeck = ({ actions, selectedIds, onToggle, disabled, cooldowns, maxSelections }: ActionDeckProps) => {
  return (
    <section className="card subtle-card">
      <header style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 18 }}>Quarterly Plays</h2>
          <small style={{ opacity: 0.7 }}>
            {maxSelections === 1
              ? 'Pick one move; each play rests for three quarters before reuse.'
              : `Queue up to ${maxSelections} moves; each rests for three quarters before reuse.`}
          </small>
        </div>
        <div style={{ fontSize: 13, opacity: 0.7 }}>
          Selected {selectedIds.length}/{maxSelections}
        </div>
      </header>
      <div className="action-list" style={{ marginTop: 16 }}>
        {actions.map((action) => {
          const isSelected = selectedIds.includes(action.id);
          const remainingCooldown = cooldowns?.get(action.id) ?? 0;
          const cooldownActive = !isSelected && remainingCooldown > 0;
          const canSelect =
            !disabled &&
            !cooldownActive &&
            (isSelected || selectedIds.length < maxSelections || maxSelections === 1);
          return (
            <article
              key={action.id}
              style={{
                borderRadius: 12,
                padding: 16,
                border: `1px solid ${isSelected ? 'rgba(56, 189, 248, 0.55)' : 'rgba(148, 163, 184, 0.35)'}`,
                background: isSelected ? 'rgba(56, 189, 248, 0.18)' : 'rgba(255, 255, 255, 0.7)',
                transition: 'border 0.2s ease, background 0.2s ease',
                opacity: isSelected ? 1 : canSelect ? 1 : 0.45,
                cursor: canSelect ? 'pointer' : 'not-allowed'
              }}
              onClick={() => canSelect && onToggle(action.id)}
              className="action-card"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 14, textTransform: 'uppercase', opacity: 0.6 }}>
                    {action.category}
                  </div>
                  <h3 style={{ margin: '4px 0 8px', fontSize: 18 }}>{action.name}</h3>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700 }}>{formatBudgetValue(action.cost)}</div>
                  <div style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        color: riskColor[action.risk]
                      }}
                    >
                      ● {action.risk.toUpperCase()} RISK
                    </span>
                  </div>
                </div>
              </div>
              <p style={{ margin: '4px 0 0', opacity: 0.78, fontSize: 14 }}>{action.description}</p>
              {cooldownActive && (
                <div style={{ marginTop: 10, fontSize: 12, fontWeight: 600, color: '#475569' }}>
                  Cooling down • available in {remainingCooldown} quarter{remainingCooldown === 1 ? '' : 's'}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};
