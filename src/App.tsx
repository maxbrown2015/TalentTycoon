import { useEffect, useMemo, useRef, useState } from 'react';
import { ActionDeck } from './components/ActionDeck';
import { AdvisorFeed } from './components/AdvisorFeed';
import { EndgameReport } from './components/EndgameReport';
import { EventPrompt } from './components/EventPrompt';
import { Header } from './components/Header';
import { KPIBoard } from './components/KPIBoard';
import { ModifiersPanel } from './components/ModifiersPanel';
import { useGameEngine } from './hooks/useGameEngine';
import { GAME_SETTINGS } from './types/game';
import { EVENT_DECK } from './data/events';

const QUARTER_MANTRAS = [
  'Quarter by quarter, ship talent—no excuses.',
  'Set the hiring pace before finance sets the budget.',
  'Tell the retention story louder than the rumor mill.',
  'Every quarter needs a flagship hire.',
  'Protect velocity with ruthless prioritisation.',
  'Pipeline is seasonal—cultivate it year round.',
  'Managers coach or they clog the roadmap.',
  'Referrals beat cold outreach when the clock runs long.',
  'Morale is the leading indicator; treat it as such.',
  'Documentation today saves escalations next quarter.',
  'Close loops fast enough that competitors hear about it.',
  'Budget is political capital—deploy it intentionally.',
  'Keep onboarding ready for the surprise headcount bump.',
  'Signals beat swag; build the signal every quarter.',
  'Celebrate hires loudly and learn from the misses.',
  'Plan four quarters out, execute the one you are in.'
];

export default function App() {
  const [started, setStarted] = useState(false);
  const [selectedEventOptionId, setSelectedEventOptionId] = useState<string>();
  const [showAdvisorModal, setShowAdvisorModal] = useState(false);
  const {
    state,
    phase,
    actions,
    resources,
    modifiers,
    currentEvent,
    turn,
    timelinePercent,
    selectAction,
    commitActions,
    resolveEvent,
    restartGame
  } = useGameEngine();

  const prevHistoryLengthRef = useRef(state.history.length);
  const actionLookup = useMemo(() => new Map(actions.map((action) => [action.id, action])), [actions]);
  const eventLookup = useMemo(() => new Map(EVENT_DECK.map((event) => [event.id, event])), []);

  useEffect(() => {
    setSelectedEventOptionId(undefined);
  }, [phase, currentEvent?.card?.id]);

  useEffect(() => {
    if (state.history.length > prevHistoryLengthRef.current) {
      setShowAdvisorModal(true);
    }
    prevHistoryLengthRef.current = state.history.length;
  }, [state.history.length]);

  const history = state.history;
  const lastRecord = history.length ? history[history.length - 1] : undefined;
  const previousRecord = history.length > 1 ? history[history.length - 2] : undefined;
  const previousResources = previousRecord?.resourceSnapshot;
  const COOLDOWN_TURNS = 3;

  const actionCooldowns = useMemo(() => {
    const map = new Map<string, number>();
    const records = state.history;
    for (let offset = 0; offset < COOLDOWN_TURNS; offset += 1) {
      const record = records[records.length - 1 - offset];
      if (!record) break;
      const remaining = COOLDOWN_TURNS - offset;
      record.selectedActionIds.forEach((id) => {
        if (remaining > 0) {
          const existing = map.get(id) ?? 0;
          map.set(id, Math.max(existing, remaining));
        }
      });
    }
    return map;
  }, [state.history]);

  const mantra = QUARTER_MANTRAS[(turn - 1) % QUARTER_MANTRAS.length];

  if (!started) {
    return (
      <div className="start-screen">
        <div className="start-card">
          <h1>Welcome to Talent Tycoon</h1>
          <p>
            Congrats, you’re now Head of Talent at Wedge.
            Product wants senior engineers yesterday. Finance wants burn at zero. Your team’s morale is one sprint away from a down round.
          </p>
          <p>
            Each quarter, pick one bold talent move that keeps shipping on track. Then brace for the chaos curveball. Investors will judge your vibes and your velocity.
          </p>
          <p>
            Survive sixteen quarters. Ship the plan. Keep morale breathable. Get fully vested.
          </p>
          <p>
            No need for UBI—for now.
          </p>
          <p>— Derek, CEO</p>
          <button className="start-button" onClick={() => setStarted(true)}>
            Step Into the Seat
          </button>
        </div>
      </div>
    );
  }

  const handleRestart = () => {
    restartGame();
    setSelectedEventOptionId(undefined);
    setShowAdvisorModal(false);
    prevHistoryLengthRef.current = 0;
    setStarted(true);
  };

  if (phase === 'complete' || state.gameOver) {
    return (
      <div className="app-shell" style={{ padding: 32 }}>
        <EndgameReport state={state} onRestart={handleRestart} />
      </div>
    );
  }

  const isPrimaryReady =
    phase === 'planning'
      ? state.selectedActionIds.length > 0
      : currentEvent
      ? Boolean(selectedEventOptionId && !currentEvent.resolved)
      : true;

  const triggerPrimaryAction = () => {
    if (showAdvisorModal) return;
    if (phase === 'planning') {
      if (state.selectedActionIds.length === 0) return;
      commitActions();
    } else if (phase === 'event') {
      if (!currentEvent) {
        resolveEvent();
      } else if (selectedEventOptionId) {
        resolveEvent(selectedEventOptionId);
      }
    }
  };

  return (
    <div className="app-shell">
      <Header
        turn={turn}
        phase={phase}
        timelinePercent={timelinePercent}
        mantra={mantra}
        onAdvance={triggerPrimaryAction}
        advanceDisabled={!isPrimaryReady || showAdvisorModal}
      />
      <main className="content layout-grid">
        <div className="row split">
          <div className="two-thirds">
            <KPIBoard resources={resources} previousResources={previousResources} />
          </div>
          <div className="one-third">
            <ModifiersPanel modifiers={modifiers} />
          </div>
        </div>
        <div className="row split">
          <div className="one-third">
            <div className="card subtle-card event-panel">
              <EventPrompt
                phase={phase}
                event={currentEvent}
                selectedOptionId={selectedEventOptionId}
                onSelectOption={setSelectedEventOptionId}
              />
            </div>
          </div>
          <div className="two-thirds">
            <ActionDeck
              actions={actions}
              selectedIds={phase === 'planning' ? state.selectedActionIds : state.lastCommittedActions}
              onToggle={selectAction}
              disabled={phase !== 'planning'}
              cooldowns={phase === 'planning' ? actionCooldowns : undefined}
              maxSelections={GAME_SETTINGS.maxActionsPerTurn}
            />
          </div>
        </div>
      </main>
      {showAdvisorModal && (
        <div className="advisor-modal">
          <div className="advisor-dialog">
            <AdvisorFeed
              resources={resources}
              modifiers={modifiers}
              turn={turn}
              lastRecord={lastRecord}
              previousRecord={previousRecord}
              actionLookup={actionLookup}
              eventLookup={eventLookup}
              onDismiss={() => setShowAdvisorModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
