import { GamePhase } from '../types/game';

const PHASE_LABELS: Record<GamePhase, string> = {
  planning: 'Planning',
  event: 'Surprise Event',
  complete: 'Quarter Review'
};

interface HeaderProps {
  turn: number;
  phase: GamePhase;
  timelinePercent: number;
  mantra: string;
  onAdvance?: () => void;
  advanceDisabled?: boolean;
  advanceLabel?: string;
}

export const Header = ({
  turn,
  phase,
  timelinePercent,
  mantra,
  onAdvance,
  advanceDisabled,
  advanceLabel = 'Advance'
}: HeaderProps) => {
  return (
    <header className="card subtle-card header-shell">
      <div className="header-left">
        <div className="header-heading">
          <h1 className="header-title">Talent Tycoon</h1>
          <strong className="header-mantra">{mantra}</strong>
        </div>
        <div className="header-meta">
          <span>Quarter {turn} of 16</span>
          <span className="header-divider">•</span>
          <span>Phase: {PHASE_LABELS[phase]}</span>
          <span className="header-divider">•</span>
          <span>{timelinePercent}% of vesting journey</span>
        </div>
      </div>
      <div className="header-right">
        {onAdvance && (
          <button className="primary-action header-advance" onClick={onAdvance} disabled={advanceDisabled}>
            {advanceLabel}
          </button>
        )}
      </div>
    </header>
  );
};
