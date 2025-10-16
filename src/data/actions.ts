import { ActionCard } from '../types/game';

export const ACTION_CATALOG: ActionCard[] = [
  {
    id: 'referral-blitz',
    name: 'Launch Referral Blitz',
    category: 'Hiring',
    cost: 180_000,
    description: 'Blast Slack with bounties and watch alumni slide back into your DMs.',
    risk: 'medium',
    effects: [
      {
        kind: 'resource',
        description: 'Referrals flood the funnel.',
        delta: { pipeline: 12 }
      },
      {
        kind: 'resource',
        description: 'Interview fatigue sneaks in.',
        delta: { morale: -4 }
      },
      {
        kind: 'resource',
        description: 'Payouts hit the balance sheet.',
        delta: { budget: -180_000 }
      }
    ],
    ongoing: {
      duration: 2,
      perTurn: [
        {
          kind: 'resource',
          description: 'Buzz lingers in the funnel.',
          delta: { pipeline: 4 }
        }
      ]
    }
  },
  {
    id: 'ats-automation',
    name: 'Invest in ATS Automation',
    category: 'Operations',
    cost: 320_000,
    description: 'Install a scheduling autopilot so coordinators can reclaim their actual jobs.',
    risk: 'low',
    effects: [
      {
        kind: 'resource',
        description: 'Vendor invoice lands.',
        delta: { budget: -320_000 }
      },
      {
        kind: 'resource',
        description: 'Loops tighten without the drama.',
        delta: { timeToFill: -6 }
      },
      {
        kind: 'modifier',
        description: 'Process debt actually budges.',
        delta: { processDebt: -3 }
      }
    ]
  },
  {
    id: 'manager-training',
    name: 'Manager Enablement Workshop',
    category: 'Culture',
    cost: 140_000,
    description: 'Lock managers in a room until they remember how to interview like adults.',
    risk: 'low',
    effects: [
      {
        kind: 'resource',
        description: 'Managers stop winging it.',
        delta: { morale: 6 }
      },
      {
        kind: 'resource',
        description: 'Product work pauses for forced learning.',
        delta: { velocity: -3 }
      },
      {
        kind: 'resource',
        description: 'Workshop tab hits finance.',
        delta: { budget: -140_000 }
      }
    ],
    ongoing: {
      duration: 3,
      perTurn: [
        {
          kind: 'resource',
          description: 'Scorecards suddenly make sense.',
          delta: { pipeline: 3, timeToFill: -1 }
        }
      ]
    }
  },
  {
    id: 'agency-sprint',
    name: 'Agency Sprint',
    category: 'Hiring',
    cost: 450_000,
    description: 'Bring in the boutique agency with the shiny Notion roster.',
    risk: 'high',
    effects: [
      {
        kind: 'resource',
        description: 'Retainer wired to the agency.',
        delta: { budget: -450_000 }
      },
      {
        kind: 'resource',
        description: 'Immediate submittals pad open reqs.',
        delta: { openRoles: -3 }
      },
      {
        kind: 'resource',
        description: 'Search time clips a few days.',
        delta: { timeToFill: -4 }
      },
      {
        kind: 'modifier',
        description: 'Market gossip heats up.',
        delta: { marketHeat: 4 }
      }
    ]
  },
  {
    id: 'brand-campaign',
    name: 'Employer Brand Campaign',
    category: 'Strategic',
    cost: 260_000,
    description: 'Polish the careers page until it smells like a Series E valuation.',
    risk: 'medium',
    effects: [
      {
        kind: 'resource',
        description: 'Splashy campaign spend.',
        delta: { budget: -260_000 }
      },
      {
        kind: 'resource',
        description: 'Inbound talent actually reads the blog.',
        delta: { pipeline: 10 }
      },
      {
        kind: 'modifier',
        description: 'Brand equity creeps upward.',
        delta: { reputation: 5 }
      }
    ],
    ongoing: {
      duration: 4,
      perTurn: [
        {
          kind: 'resource',
          description: 'Slack stays unusually positive.',
          delta: { morale: 2 }
        }
      ]
    }
  },
  {
    id: 'reprioritize-headcount',
    name: 'Reprioritize Headcount',
    category: 'Strategic',
    cost: 0,
    description: 'Reorder the roadmap deck and pretend this was always the plan.',
    risk: 'low',
    effects: [
      {
        kind: 'resource',
        description: 'Non-critical reqs quietly vanish.',
        delta: { openRoles: -4 }
      },
      {
        kind: 'resource',
        description: 'Teams spin briefly on new priorities.',
        delta: { velocity: -4 }
      },
      {
        kind: 'modifier',
        description: 'Process debt eases with focus.',
        delta: { processDebt: -2 }
      }
    ]
  },
  {
    id: 'culture-summit',
    name: 'Culture Summit',
    category: 'Culture',
    cost: 220_000,
    description: 'Fly squads to Tahoe, bribe burnout with cold brew and trust falls.',
    risk: 'medium',
    effects: [
      {
        kind: 'resource',
        description: 'Energy spikes post-offsite glow.',
        delta: { morale: 10 }
      },
      {
        kind: 'resource',
        description: 'Ship velocity naps for a week.',
        delta: { velocity: -6 }
      },
      {
        kind: 'resource',
        description: 'Offsite invoices roll in.',
        delta: { budget: -220_000 }
      }
    ]
  },
  {
    id: 'process-deep-dive',
    name: 'Interview Process Deep Dive',
    category: 'Operations',
    cost: 120_000,
    description: 'Spin up a tiger team to duct-tape the interview loop (again).',
    risk: 'medium',
    effects: [
      {
        kind: 'resource',
        description: 'Product squads lend bodies.',
        delta: { velocity: -2 }
      },
      {
        kind: 'resource',
        description: 'Calendars stop playing Tetris.',
        delta: { timeToFill: -5 }
      },
      {
        kind: 'modifier',
        description: 'Interview chaos cools down.',
        delta: { processDebt: -3 }
      },
      {
        kind: 'resource',
        description: 'Consultant sends their invoice.',
        delta: { budget: -120_000 }
      }
    ]
  },
  {
    id: 'talent-analytics-pilot',
    name: 'Pilot Talent Intelligence Suite',
    category: 'Operations',
    cost: 160_000,
    description: 'Wire up dashboards so every exec sees funnel leaks in real time.',
    risk: 'low',
    effects: [
      {
        kind: 'resource',
        description: 'License fee and implementation sprint.',
        delta: { budget: -160_000 }
      },
      {
        kind: 'resource',
        description: 'Recruiters plug leaks faster with fresh signal.',
        delta: { pipeline: 6, timeToFill: -3 }
      },
      {
        kind: 'modifier',
        description: 'Process debt eases as the loop gets instrumented.',
        delta: { processDebt: -2 }
      }
    ]
  },
  {
    id: 'executive-roadshow',
    name: 'Executive Recruiting Roadshow',
    category: 'Strategic',
    cost: 310_000,
    description: 'Fly founders to top markets and host invite-only recruiting salons.',
    risk: 'medium',
    effects: [
      {
        kind: 'resource',
        description: 'Travel, venues, and sponsorships hit the ledger.',
        delta: { budget: -310_000 }
      },
      {
        kind: 'resource',
        description: 'Warm leads turn into signed exec-level acceptances.',
        delta: { openRoles: -2 }
      },
      {
        kind: 'resource',
        description: 'Leadership visibility buoys morale back home.',
        delta: { morale: 3, velocity: -2 }
      },
      {
        kind: 'modifier',
        description: 'Board loves the signal that the bench is leveling up.',
        delta: { reputation: 4 }
      }
    ]
  },
  {
    id: 'war-room-surge',
    name: 'Launch Recruiter War Room',
    category: 'Hiring',
    cost: 280_000,
    description: 'Stack external sourcers with internal closers for a two-week blitz.',
    risk: 'high',
    effects: [
      {
        kind: 'resource',
        description: 'Overtime, bonuses, and sourcer invoices stack up fast.',
        delta: { budget: -280_000 }
      },
      {
        kind: 'resource',
        description: 'Pipeline balloons but teams feel the context switching.',
        delta: { pipeline: 12, morale: -4, velocity: -5 }
      }
    ],
    ongoing: {
      duration: 2,
      perTurn: [
        {
          kind: 'resource',
          description: 'Follow-through interviews keep hitting calendars.',
          delta: { pipeline: 4, morale: -2 }
        }
      ]
    }
  },
  {
    id: 'feature-freeze-sprint',
    name: 'Feature Freeze Sprint',
    category: 'Operations',
    cost: 80_000,
    description: 'Call a ten-day freeze and redeploy builders to unblock hiring loops.',
    risk: 'medium',
    effects: [
      {
        kind: 'resource',
        description: 'Focused IC support lifts throughput on critical reqs.',
        delta: { velocity: 6 }
      },
      {
        kind: 'resource',
        description: 'Product deadlines slip while the freeze is active.',
        delta: { morale: -3 }
      },
      {
        kind: 'resource',
        description: 'Contractors and overtime burn cash.',
        delta: { budget: -80_000 }
      }
    ]
  },
  {
    id: 'automation-war-room',
    name: 'Automation War Room',
    category: 'Operations',
    cost: 180_000,
    description: 'Drop a strike team on repeatable offer and onboarding work to go faster.',
    risk: 'high',
    effects: [
      {
        kind: 'resource',
        description: 'Velocity jumps as manual loops disappear.',
        delta: { velocity: 8 }
      },
      {
        kind: 'modifier',
        description: 'Process debt shrinks with cleaner automation.',
        delta: { processDebt: -4 }
      },
      {
        kind: 'resource',
        description: 'Standing up tooling and consultants drains cash.',
        delta: { budget: -180_000 }
      },
      {
        kind: 'resource',
        description: 'Teams feel the grind of the war room push.',
        delta: { morale: -2 }
      }
    ],
    ongoing: {
      duration: 2,
      perTurn: [
        {
          kind: 'resource',
          description: 'Automation upkeep carries into future quarters.',
          delta: { budget: -30_000 }
        }
      ]
    }
  }
];
