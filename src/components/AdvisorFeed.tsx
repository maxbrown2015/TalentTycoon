import {
  ActionCard,
  Effect,
  EventCard,
  GameModifiers,
  ResourceKey,
  ResourceSnapshot,
  TurnRecord
} from '../types/game';

interface AdvisorFeedProps {
  resources: ResourceSnapshot;
  modifiers: GameModifiers;
  turn: number;
  onDismiss?: () => void;
  lastRecord?: TurnRecord;
  previousRecord?: TurnRecord;
  actionLookup: Map<string, ActionCard>;
  eventLookup: Map<string, EventCard>;
}

const buildInsight = (resources: ResourceSnapshot, modifiers: GameModifiers, turn: number) => {
  const tips: string[] = [];

  if (resources.openRoles >= 30) {
    tips.push(
      'Headcount backlog is a bonfire. Draft the CEO to bless ruthless reprioritisation right now.',
      'Req pile is taller than the roadmap. Trade projects for recruiters or start closing doors.'
    );
  } else if (resources.openRoles >= 15) {
    tips.push(
      'Open roles are still a skyline. Put every manager on weekly close targets.',
      'Too many reqs, not enough oxygen. Pull a hiring freeze on anything that isn’t revenue critical.'
    );
  } else if (resources.openRoles <= 5) {
    tips.push(
      'Req list is finally human-sized. Layer in succession planning before someone bolts.',
      'Low open roles: perfect moment to tighten quality rather than chasing volume.'
    );
  }

  if (resources.pipeline < 40) {
    tips.push(
      'Pipeline is dust. Spin a “Work With Us” roadshow and loan your best storytellers.',
      'Candidate flow is on fumes. Dump budget into signal-boosting now or suffer in two quarters.'
    );
  } else if (resources.pipeline > 80) {
    tips.push(
      'Huge pipeline. Audit quality before coordinators drown.',
      'Leads everywhere—great. Now make sure interviewers don’t turn into a slow drip.'
    );
  }

  if (resources.morale < 45) {
    tips.push(
      'Morale is below seawater. Set the strategy deck aside and go do human work.',
      'Teams are exhausted. Ship a quick win or expect surprise attrition.'
    );
  } else if (resources.morale > 75) {
    tips.push(
      'Morale is singing. Use it to pilot a risky process change while people are forgiving.',
      'Team energy is high—time to ask for referrals and case studies before the mood swings.'
    );
  }

  if (resources.budget < 1_000_000) {
    tips.push(
      'Budget is rattling in the jar. Surface a savings plan before finance drops a mandate.',
      'Nearly tapped out. Renegotiate suppliers or swap to lower-cost plays.'
    );
  } else if (resources.budget > 6_000_000) {
    tips.push(
      'Cash cushion is real. Secure an evergreen sourcing investment while the CFO is smiling.',
      'Plenty of budget. Spend it on automation instead of bodies before anyone notices.'
    );
  }

  if (resources.timeToFill > 60) {
    tips.push(
      'Time-to-fill is crawling. Stand up a red-team to nuke bottlenecks.',
      'Above-60 day time-to-fill? Interview loops need a war room yesterday.'
    );
  } else if (resources.timeToFill <= 35) {
    tips.push(
      'Hiring velocity is sharp. Press advantage with a brag note to investors.',
      'Slick time-to-fill numbers. Capture the process and train the rest of the org.'
    );
  }

  if (resources.velocity < 45) {
    tips.push(
      'Delivery velocity is lagging. Make space for ICs by pausing leadership junk work.',
      'Velocity is wobbling. Pair critical hires with enablement, not more standups.'
    );
  } else if (resources.velocity > 70) {
    tips.push(
      'Velocity looks hot. Confirm it’s sustainable, not just a pre-board push.',
      'Product is racing. Sneak in a “hire for tomorrow” conversation while execs are smiling.'
    );
  }

  if (modifiers.reputation < 6) {
    tips.push(
      'Reputation score is soft. You need executive allies speaking on your behalf.',
      'Credibility is thin—ship a narrative update that screams “under control.”'
    );
  } else if (modifiers.reputation > 20) {
    tips.push(
      'Reputation is glowing. Cash it in for resources before the next board cycle.',
      'Exec trust is high. Ask for the talent intelligence stack you keep hinting at.'
    );
  }

  if (modifiers.marketHeat > 20) {
    tips.push(
      'Market heat is lava. Lock your stars down with stay interviews this week.',
      'Poachers are circling. Push compensation refresh or risk a resignation thread.'
    );
  } else if (modifiers.marketHeat < 8) {
    tips.push(
      'Market is quiet—perfect to line up niche hires without bidding wars.',
      'Low market heat is a window. Hunt for specialised talent while everyone else sleeps.'
    );
  }

  if (modifiers.processDebt > 25) {
    tips.push(
      'Process debt is ballooning. Hit pause and refactor before the next hiring sprint.',
      'Ops friction is high. Drop a tiger team on interviews before candidate NPS tanks.'
    );
  } else if (modifiers.processDebt < 8) {
    tips.push(
      'Process debt nice and low. Scale what works before the org grows again.',
      'Systems are humming—document now so the next wave doesn’t break them.'
    );
  }

  const pool = tips.length
    ? tips
    : [
        'Quarters like this are rare. Bank goodwill and pre-wire the next big bet.',
        'Dashboard zen. Use it to sharpen the strategic narrative before the next storm.',
        'Everything’s green. Time to scout the leap that keeps you ahead of the curve.'
      ];

  const signalBase = Math.abs(
    Math.round(
      resources.pipeline +
        resources.morale +
        resources.velocity +
        modifiers.marketHeat * 2 +
        modifiers.reputation +
        turn * 11
    )
  );

  const cycleOffset = Math.floor(turn / pool.length);
  const historicShift = Math.abs(Math.round(modifiers.reputation + modifiers.processDebt)) % pool.length;
  const index = (signalBase + cycleOffset + historicShift) % pool.length;
  return pool[index];
};

const formatChangeValue = (key: ResourceKey, delta: number) => {
  const rounded = Math.round(Math.abs(delta));
  const prefix = delta > 0 ? '+' : delta < 0 ? '-' : '+';
  if (key === 'budget') {
    if (delta === 0) return '+$0';
    const abs = Math.abs(delta);
    if (abs >= 1_000_000) {
      const value = Math.round((abs / 1_000_000) * 10) / 10;
      return `${prefix}$${value}m`;
    }
    if (abs >= 1_000) {
      const value = Math.round((abs / 1_000) * 10) / 10;
      return `${prefix}$${value}k`;
    }
    return `${prefix}$${rounded}`;
  }
  if (key === 'timeToFill') {
    return `${prefix}${rounded}d`;
  }
  return `${prefix}${rounded}`;
};

const resourceLabels: Record<ResourceKey, string> = {
  budget: 'Budget',
  openRoles: 'Open Roles',
  pipeline: 'Pipeline',
  timeToFill: 'Time to Fill',
  morale: 'Morale',
  velocity: 'Velocity'
};

const positiveIsGood: Record<ResourceKey, boolean> = {
  budget: true,
  openRoles: false,
  pipeline: true,
  timeToFill: false,
  morale: true,
  velocity: true
};

const collectReasons = (
  resourceKey: ResourceKey,
  actionCards: ActionCard[],
  eventOutcomeLabel: string | undefined,
  eventEffects: TurnRecord['eventEffects'] | undefined,
  totalDelta: number
) => {
  type ReasonEntry = { label: string; text?: string; deltas: number[] };
  const buckets = new Map<string, ReasonEntry>();

  const trackReason = (label: string, text: string | undefined, delta: number) => {
    const key = `${label}::${text ?? ''}`;
    const existing = buckets.get(key);
    if (existing) {
      existing.deltas.push(delta);
    } else {
      buckets.set(key, { label, text, deltas: [delta] });
    }
  };

  actionCards.forEach((action) => {
    action.effects.forEach((effect) => {
      if (effect.kind === 'resource') {
        const delta = effect.delta?.[resourceKey];
        if (delta) {
          trackReason(action.name, effect.description, delta);
        }
      }
    });
    action.ongoing?.perTurn.forEach((effect) => {
      if (effect.kind === 'resource') {
        const delta = effect.delta?.[resourceKey];
        if (delta) {
          trackReason(`${action.name} (ongoing)`, effect.description, delta);
        }
      }
    });
  });

  eventEffects?.forEach((effect) => {
    if (effect.kind === 'resource') {
      const delta = effect.delta?.[resourceKey];
      if (delta) {
        trackReason(eventOutcomeLabel ?? 'Event', effect.description, delta);
      }
    }
  });

  const entries = Array.from(buckets.values());

  if (!entries.length) {
    return [{ label: 'Status', text: 'No material movement logged.' }];
  }

  const deltaEquals = totalDelta !== 0;
  const includeSingleDeltas = deltaEquals ? entries.length > 1 : true;
  const hasMultiple = entries.some((entry) => entry.deltas.length > 1);

  return entries.map((entry) => {
    if (!includeSingleDeltas && entry.deltas.length <= 1) {
      return {
        label: entry.label,
        text: entry.text
      };
    }

    const deltas = entry.deltas
      .map((value) => {
        const rounded = Math.round(Math.abs(value));
        const prefix = value > 0 ? '+' : value < 0 ? '-' : '+';
        return `${prefix}${rounded}`;
      })
      .join(', ');

    const textWithDelta =
      (entry.deltas.length > 1 || hasMultiple) && deltas
        ? `${entry.text ?? ''} (${deltas})`.trim()
        : entry.text;

    return {
      label: entry.label,
      text: textWithDelta
    };
  });
};

export const AdvisorFeed = ({
  resources,
  modifiers,
  turn,
  onDismiss,
  lastRecord,
  previousRecord,
  actionLookup,
  eventLookup
}: AdvisorFeedProps) => {
  const bodyTip = buildInsight(resources, modifiers, turn);

  const latestSnapshot = lastRecord?.resourceSnapshot ?? resources;
  const previousSnapshot = previousRecord?.resourceSnapshot;

  const actionCards = (lastRecord?.selectedActionIds ?? [])
    .map((id) => actionLookup.get(id))
    .filter((card): card is ActionCard => Boolean(card));

  const eventCard = lastRecord?.eventId ? eventLookup.get(lastRecord.eventId) : undefined;
  const eventOutcomeTone = lastRecord?.eventOutcomeTone ?? 'neutral';
  const rawOutcomeLabel = lastRecord?.eventOutcomeLabel ?? (eventCard ? 'Outcome' : 'No Curveball');
  const eventOutcomeLabel = rawOutcomeLabel === 'No Event' ? 'No Curveball' : rawOutcomeLabel;
  const eventOutcomeDescription =
    lastRecord?.eventOutcomeDescription ??
    (eventOutcomeLabel === 'No Curveball'
      ? 'No curveball this quarter — phew.'
      : eventCard?.summary ?? '');

  const approximateDeltas = new Map<ResourceKey, number>();
  const addApproximateDelta = (key: ResourceKey, amount: number) => {
    const current = approximateDeltas.get(key) ?? 0;
    approximateDeltas.set(key, current + amount);
  };

  const accumulateEffectDelta = (effect: Effect) => {
    if (effect.kind !== 'resource') {
      return;
    }
    (Object.entries(effect.delta) as Array<[ResourceKey, number | undefined]>).forEach(
      ([key, delta]) => {
        if (delta) {
          addApproximateDelta(key, delta);
        }
      }
    );
  };

  if (!previousSnapshot) {
    actionCards.forEach((action) => {
      action.effects.forEach(accumulateEffectDelta);
    });
    lastRecord?.eventEffects?.forEach(accumulateEffectDelta);
  }

  const resourceChanges = (Object.keys(latestSnapshot) as ResourceKey[]).map((key) => {
    const value = latestSnapshot[key];
    const prev = previousSnapshot ? previousSnapshot[key] : undefined;
    const delta = prev !== undefined ? value - prev : approximateDeltas.get(key) ?? 0;
    const isPositiveGood = positiveIsGood[key];
    const isImprovement = delta !== 0 && (isPositiveGood ? delta > 0 : delta < 0);
    const isRegression = delta !== 0 && (isPositiveGood ? delta < 0 : delta > 0);
    return {
      key,
      delta,
      isImprovement,
      isRegression,
      reasons: collectReasons(
        key,
        actionCards,
        eventOutcomeLabel,
        lastRecord?.eventEffects,
        lastRecord?.selectedActionIds.length && !previousSnapshot ? approximateDeltas.get(key) ?? 0 : delta
      )
    };
  });

  const improvements = resourceChanges.filter((item) => item.isImprovement);
  const regressions = resourceChanges.filter((item) => item.isRegression);

  return (
    <section className="advisor-card">
      <header className="advisor-header">
        <h2>End of Quarter Review</h2>
      </header>

      <h4 className="advisor-section-heading">Curveball Outcome</h4>
      <div className={`advisor-event-outcome ${eventOutcomeTone}`}>
        <div className="advisor-event-header">
          <span className="event-badge">{eventOutcomeLabel}</span>
          <span className="event-source">
            {eventCard ? eventCard.name : 'Quiet quarter — no curveball triggered.'}
          </span>
        </div>
        {eventOutcomeDescription && (
          <p className="event-outcome-summary">{eventOutcomeDescription}</p>
        )}
      </div>

      <div className="advisor-deltas">
        <div className="advisor-delta-column">
          <h4>Up and to the Right</h4>
          {improvements.length ? (
            improvements.map((change) => (
              <div key={change.key} className="advisor-delta-card up">
                <div className="delta-header">
                  <span>{resourceLabels[change.key]}</span>
                  <strong>{formatChangeValue(change.key, change.delta)}</strong>
                </div>
                <ul>
                  {change.reasons.map((reason, idx) => (
                    <li key={idx}>
                      <strong>{reason.label}</strong>
                      {reason.text ? ` — ${reason.text}` : ''}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p className="delta-empty">No wins logged — maybe next quarter.</p>
          )}
        </div>
        <div className="advisor-delta-column">
          <h4>Soft Spots</h4>
          {regressions.length ? (
            regressions.map((change) => (
              <div key={change.key} className="advisor-delta-card down">
                <div className="delta-header">
                  <span>{resourceLabels[change.key]}</span>
                  <strong>{formatChangeValue(change.key, change.delta)}</strong>
                </div>
                <ul>
                  {change.reasons.map((reason, idx) => (
                    <li key={idx}>
                      <strong>{reason.label}</strong>
                      {reason.text ? ` — ${reason.text}` : ''}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p className="delta-empty">No regressions detected. Take the win.</p>
          )}
        </div>
      </div>

      <footer className="advisor-footer">
        <div className="advisor-tip-card">{bodyTip}</div>
        {onDismiss && (
          <button className="primary-action advisor-dismiss" onClick={onDismiss}>
            Start Next Quarter
          </button>
        )}
      </footer>
    </section>
  );
};
