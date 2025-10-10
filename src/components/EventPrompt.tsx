import { ActiveEvent, GamePhase } from '../types/game';

interface EventPromptProps {
  phase: GamePhase;
  event?: ActiveEvent;
  selectedOptionId?: string;
  onSelectOption: (optionId: string) => void;
}

export const EventPrompt = ({ phase, event, selectedOptionId, onSelectOption }: EventPromptProps) => {
  if (!event) {
    const heading = phase === 'event' ? 'No Curveball This Quarter' : 'Waiting on the Curveball';
    const copy =
      phase === 'event'
        ? 'You dodged chaos this quarter. Hit Advance to bank the momentum.'
        : 'Lock in your move to reveal this quarter’s curveball.';
    return (
      <div>
        <h2 style={{ margin: '0 0 8px' }}>{heading}</h2>
        <p style={{ margin: 0, opacity: 0.75 }}>{copy}</p>
      </div>
    );
  }

  const { card } = event;

  return (
    <div>
      <header style={{ marginBottom: 12 }}>
        <h2 style={{ margin: '0 0 6px', fontSize: 20 }}>{card.name}</h2>
        <p style={{ margin: 0, opacity: 0.75 }}>{card.summary}</p>
        <p style={{ margin: '12px 0 0', opacity: 0.65, fontSize: 14 }}>Select a response to queue the outcome.</p>
      </header>
      <div style={{ display: 'grid', gap: 12 }}>
        {card.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          return (
            <article
              key={option.id}
              role="button"
              tabIndex={0}
              onClick={() => !event.resolved && onSelectOption(option.id)}
              onKeyDown={(evt) => {
                if (!event.resolved && (evt.key === 'Enter' || evt.key === ' ')) {
                  evt.preventDefault();
                  onSelectOption(option.id);
                }
              }}
              style={{
                padding: 14,
                borderRadius: 12,
                border: `1px solid ${isSelected ? 'rgba(56, 189, 248, 0.75)' : 'rgba(148, 163, 184, 0.3)'}`,
                background: isSelected ? 'rgba(56, 189, 248, 0.18)' : 'rgba(237, 242, 247, 0.65)',
                boxShadow: isSelected ? '0 0 0 2px rgba(56, 189, 248, 0.25)' : 'none',
                cursor: event.resolved ? 'default' : 'pointer',
                transition: 'border 0.2s ease, background 0.2s ease, box-shadow 0.2s ease',
                outline: 'none'
              }}
            >
              <h3 style={{ margin: '0 0 6px', fontSize: 16 }}>{option.label}</h3>
              <p style={{ margin: 0, opacity: 0.75 }}>{option.description}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
};
