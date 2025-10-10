import { EventCard } from '../types/game';

export const EVENT_DECK: EventCard[] = [
  {
    id: 'ai-poach-offer',
    name: 'AI Startup Poaches Tech Lead',
    summary:
      'Your ledger whisperer just got love-bombed by an AI rocketship dangling monopoly-money equity.',
    weight: 4,
    minTurn: 3,
    options: [
      {
        id: 'counter-offer',
        label: 'Match the Offer with Retention Bonus',
        description: 'Match the funny-money and pray finance looks away.',
        effects: [
          {
            kind: 'resource',
            description: 'Retention bonus hits the budget.',
            delta: { budget: -350_000 }
          }
        ],
        outcomes: [
          {
            id: 'retain-bonus',
            label: 'Retention bonus lands',
            description: 'Staff engineer stays and doubles down.',
            weight: 65,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Team breathes easier.', delta: { morale: 4 } },
              { kind: 'resource', description: 'Velocity stabilises.', delta: { velocity: 1 } },
              { kind: 'modifier', description: 'Leadership sees the conviction.', delta: { reputation: 2 } }
            ]
          },
          {
            id: 'retain-fails',
            label: 'They take the cash and bounce',
            description: 'Bonus lands, but they still depart for the rocketship.',
            weight: 35,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Team morale slides.', delta: { morale: -3 } },
              { kind: 'resource', description: 'Delivery loses a step.', delta: { velocity: -6 } },
              { kind: 'resource', description: 'Backfill queue grows.', delta: { timeToFill: 3 } },
              { kind: 'modifier', description: 'Market heat spikes as rumors spread.', delta: { marketHeat: 3 } }
            ]
          }
        ]
      },
      {
        id: 'let-go',
        label: 'Wish Them Luck and Promote from Within',
        description: 'Let them chase AGI, elevate the bench player you actually trust.',
        effects: [],
        outcomes: [
          {
            id: 'promotion-sticks',
            label: 'Promotion sticks the landing',
            description: 'New lead steadies the squad with only a slight wobble.',
            weight: 45,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Team rallies behind the new lead.', delta: { morale: 2 } },
              { kind: 'resource', description: 'Pace dips briefly.', delta: { velocity: -2 } },
              { kind: 'resource', description: 'Backfill requirement drops.', delta: { openRoles: -1 } },
              { kind: 'modifier', description: 'Leadership notices the composure.', delta: { reputation: 1 } }
            ]
          },
          {
            id: 'promotion-wobbles',
            label: 'Promotion wobbles under pressure',
            description: 'The interim lead struggles with the sudden load.',
            weight: 55,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Confidence takes a hit.', delta: { morale: -2 } },
              { kind: 'resource', description: 'Velocity erodes.', delta: { velocity: -4 } },
              { kind: 'resource', description: 'Hiring effort creeps upward.', delta: { timeToFill: 2 } },
              { kind: 'modifier', description: 'Process debt sneaks back in.', delta: { processDebt: 1 } }
            ]
          }
        ]
      },
      {
        id: 'external-search',
        label: 'Launch Emergency External Search',
        description: 'Spin up an exec search and hope your pipeline isn’t fumes.',
        effects: [
          {
            kind: 'resource',
            description: 'Executive recruiter retainer.',
            delta: { budget: -260_000 }
          }
        ],
        outcomes: [
          {
            id: 'headhunter-win',
            label: 'Recruiter delivers a ringer',
            description: 'A replacement arrives quicker than expected.',
            weight: 55,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Velocity ticks up.', delta: { velocity: 4 } },
              { kind: 'resource', description: 'Headcount gap closes.', delta: { openRoles: -1 } },
              { kind: 'modifier', description: 'Market hears the team is still a destination.', delta: { reputation: 2 } }
            ]
          },
          {
            id: 'search-drags',
            label: 'Search drags on',
            description: 'Weeks pass, candidates keep ghosting.',
            weight: 45,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Team morale cracks.', delta: { morale: -3 } },
              { kind: 'resource', description: 'Delivery slips further.', delta: { velocity: -5 } },
              { kind: 'modifier', description: 'Competitors notice the opening.', delta: { marketHeat: 3 } }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'ats-outage',
    name: 'ATS Goes Dark',
    summary: 'Your applicant tracking vendor just shipped a patch that bricks scheduling across the org.',
    weight: 4,
    options: [
      {
        id: 'manual-war-room',
        label: 'Spin Up Manual Scheduling War Room',
        description: 'Pull coordinators into a spreadsheet bunker and triage every loop by hand.',
        effects: [
          { kind: 'resource', description: 'Product squads lend coordinators to the scramble.', delta: { velocity: -3 } }
        ],
        outcomes: [
          {
            id: 'war-room-holds',
            label: 'Spreadsheet brigade holds',
            description: 'Manual scheduling keeps candidates moving without too much fallout.',
            weight: 60,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Pipeline barely slows.', delta: { pipeline: -1 } },
              { kind: 'resource', description: 'Teams appreciate the hustle.', delta: { morale: 2 } }
            ]
          },
          {
            id: 'war-room-buckles',
            label: 'Manual chaos ensues',
            description: 'Double-booked loops and missed emails derail priority candidates.',
            weight: 40,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Pipeline springs leaks.', delta: { pipeline: -6 } },
              { kind: 'modifier', description: 'Process debt balloons after the scramble.', delta: { processDebt: 3 } }
            ]
          }
        ]
      },
      {
        id: 'escalate-vendor',
        label: 'Escalate Vendor with Emergency Budget',
        description: 'Throw executive pressure and cash at the vendor to prioritize a hotfix.',
        effects: [
          { kind: 'resource', description: 'Expedited support retainer hits the ledger.', delta: { budget: -140_000 } }
        ],
        outcomes: [
          {
            id: 'vendor-delivers',
            label: 'Vendor ships overnight fix',
            description: 'Platform comes back with extra monitoring and fewer surprises.',
            weight: 55,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Pipeline rebounds sharply.', delta: { pipeline: 5 } },
              { kind: 'modifier', description: 'Stakeholders clock the decisive response.', delta: { reputation: 2 } }
            ]
          },
          {
            id: 'vendor-stalls',
            label: 'Vendor stalls despite pressure',
            description: 'Fix slips, finance fumes, and the outage drags into next week.',
            weight: 45,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Morale sours from the wasted effort.', delta: { morale: -3 } },
              { kind: 'resource', description: 'Backlog of loops grows.', delta: { timeToFill: 3 } }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'offer-counterattack',
    name: 'Counteroffer Crossfire',
    summary: 'Your top Staff engineer candidate just announced a counteroffer with 30% more equity.',
    weight: 6,
    minTurn: 3,
    options: [
      {
        id: 'stretch-offer',
        label: 'Stretch Comp to Match',
        description: 'Match the number, spin it as conviction, and pray finance forgives you.',
        effects: [
          { kind: 'resource', description: 'Additional stock and signing bonus.', delta: { budget: -220_000 } }
        ],
        outcomes: [
          {
            id: 'stretch-wins',
            label: 'Candidate signs with a grin',
            description: 'They accept and evangelize the team from day one.',
            weight: 50,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Velocity jumps with the new anchor.', delta: { velocity: 4 } },
              { kind: 'resource', description: 'Morale pops from the win.', delta: { morale: 3 } },
              { kind: 'modifier', description: 'Leadership buys more of your forecasts.', delta: { reputation: 2 } }
            ],
            weightTweaks: [
              { metric: 'reputation', when: 'high', shift: 0.05 },
              { metric: 'marketHeat', when: 'low', shift: 0.03 }
            ]
          },
          {
            id: 'stretch-loses',
            label: 'Candidate still walks',
            description: 'They use your stretch to squeeze another raise elsewhere.',
            weight: 50,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Open roles stay clogged.', delta: { openRoles: 1 } },
              { kind: 'resource', description: 'Finance rues the headline number.', delta: { budget: -80_000 } }
            ],
            weightTweaks: [
              { metric: 'marketHeat', when: 'high', shift: 0.05 }
            ]
          }
        ]
      },
      {
        id: 'sell-mission',
        label: 'Sell Mission Over Money',
        description: 'Reframe the offer on impact, team fit, and future upside.',
        effects: [],
        outcomes: [
          {
            id: 'mission-convinces',
            label: 'Story beats salary',
            description: 'Candidate leans into the mission and signs your offer.',
            weight: 55,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Velocity stabilizes with the new leader.', delta: { velocity: 2 } },
              { kind: 'resource', description: 'Morale gets a clean win.', delta: { morale: 2 } },
              { kind: 'modifier', description: 'Reputation as closer grows.', delta: { reputation: 2 } }
            ],
            weightTweaks: [
              { metric: 'reputation', when: 'high', shift: 0.04 },
              { metric: 'marketHeat', when: 'low', shift: 0.03 }
            ]
          },
          {
            id: 'mission-falls-flat',
            label: 'Story falls flat',
            description: 'They thank you for the narrative and still chase the bigger check.',
            weight: 45,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Pipeline loses a marquee candidate.', delta: { pipeline: -4 } },
              { kind: 'resource', description: 'Team morale dips at the miss.', delta: { morale: -3 } }
            ],
            weightTweaks: [
              { metric: 'reputation', when: 'low', shift: 0.04 },
              { metric: 'marketHeat', when: 'high', shift: 0.04 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'manager-resignation',
    name: 'Hiring Manager Resigns Mid-Search',
    summary: 'The hiring manager running your most critical req just resigned with zero notice.',
    weight: 5,
    options: [
      {
        id: 'appoint-interim',
        label: 'Appoint Interim Lead',
        description: 'Elevate a trusted IC to cover interviews and decisions.',
        effects: [],
        outcomes: [
          {
            id: 'interim-shines',
            label: 'Interim lead shines',
            description: 'They run the loop smoothly and win credibility.',
            weight: 50,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Time-to-fill barely moves.', delta: { timeToFill: -1 } },
              { kind: 'resource', description: 'Team feels supported.', delta: { morale: 3 } },
              { kind: 'modifier', description: 'Reputation climbs for the quick pivot.', delta: { reputation: 2 } }
            ]
          },
          {
            id: 'interim-struggles',
            label: 'Interim struggles',
            description: 'Critical feedback stalls and candidates slip away.',
            weight: 50,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Loop delays cost time.', delta: { timeToFill: 5 } },
              { kind: 'resource', description: 'Morale dips with added uncertainty.', delta: { morale: -4 } }
            ]
          }
        ]
      },
      {
        id: 'pause-search',
        label: 'Pause Search to Reframe',
        description: 'Call a timeout, rebuild the profile, and reopen with clarity.',
        effects: [
          { kind: 'resource', description: 'Pipeline cools while you regroup.', delta: { pipeline: -3 } }
        ],
        outcomes: [
          {
            id: 'reframe-works',
            label: 'Reframe works',
            description: 'Reset criteria lands a fresher, more accurate slate.',
            weight: 45,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'New pipeline quality surges.', delta: { pipeline: 7 } },
              { kind: 'resource', description: 'Time-to-fill trims down after reboot.', delta: { timeToFill: -4 } }
            ]
          },
          {
            id: 'reframe-drags',
            label: 'Reframe drags on',
            description: 'Stakeholders argue and the role sits idle for weeks.',
            weight: 55,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Velocity slips from the vacancy.', delta: { velocity: -4 } },
              { kind: 'modifier', description: 'Process debt ticks up from churn.', delta: { processDebt: 2 } }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'ceo-spotlight',
    name: 'CEO Wants Weekly Spotlight',
    summary: 'The CEO now wants a live weekly hiring spotlight to reassure the board.',
    weight: 4,
    options: [
      {
        id: 'build-dashboard',
        label: 'Build Broadcast-Ready Dashboard',
        description: 'Spin up a show-stopping deck with data hooks and narrative.',
        effects: [
          { kind: 'resource', description: 'Analytics sprint steals a cycle.', delta: { velocity: -2 } }
        ],
        outcomes: [
          {
            id: 'dashboard-wows',
            label: 'Broadcast wows the board',
            description: 'Stakeholders rave about clarity and polish.',
            weight: 60,
            tone: 'success',
            effects: [
              { kind: 'modifier', description: 'Reputation skyrockets with execs.', delta: { reputation: 4 } },
              { kind: 'resource', description: 'Morale perks up from executive praise.', delta: { morale: 2 } }
            ]
          },
          {
            id: 'dashboard-overload',
            label: 'Data overload backfires',
            description: 'Too much detail raises new questions and panic.',
            weight: 40,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Velocity pays the distraction tax.', delta: { velocity: -3 } },
              { kind: 'modifier', description: 'Process debt grows with extra reporting.', delta: { processDebt: 2 } }
            ]
          }
        ]
      },
      {
        id: 'coach-ceo',
        label: 'Coach CEO on Cadence',
        description: 'Push for bi-weekly digest and prep leadership to field questions.',
        effects: [],
        outcomes: [
          {
            id: 'cadence-agreed',
            label: 'Cadence compromise lands',
            description: 'CEO agrees to sane updates and trusts your framing.',
            weight: 55,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Velocity stays focused.', delta: { velocity: 1 } },
              { kind: 'modifier', description: 'Executive trust deepens.', delta: { reputation: 3 } }
            ]
          },
          {
            id: 'cadence-rejected',
            label: 'Pushback sparks friction',
            description: 'CEO doubles down and calls for even more visibility.',
            weight: 45,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Morale dips under microscope.', delta: { morale: -3 } },
              { kind: 'modifier', description: 'Process debt creeps up from added status updates.', delta: { processDebt: 2 } }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'market-buzz',
    name: 'Competitor Launch Sparks Buzz',
    summary: 'A rival just launched a splashy campaign poaching talent with glossy promises.',
    weight: 5,
    options: [
      {
        id: 'launch-brand-response',
        label: 'Launch Fast Brand Response',
        description: 'Spin a targeted campaign showcasing your wins and team culture.',
        effects: [
          { kind: 'resource', description: 'Campaign budget goes live overnight.', delta: { budget: -240_000 } }
        ],
        outcomes: [
          {
            id: 'response-resonates',
            label: 'Response resonates',
            description: 'Traffic jumps and candidates rally to your story.',
            weight: 55,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Pipeline swells with renewed inbound.', delta: { pipeline: 8 } },
              { kind: 'modifier', description: 'Brand reputation shines brighter.', delta: { reputation: 3 } }
            ],
            weightTweaks: [
              { metric: 'reputation', when: 'high', shift: 0.04 }
            ]
          },
          {
            id: 'response-misfires',
            label: 'Campaign misfires',
            description: 'Ads underperform and finance questions the spend.',
            weight: 45,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Pipeline barely moves.', delta: { pipeline: -1 } },
              { kind: 'resource', description: 'Budget hit stings harder.', delta: { budget: -60_000 } }
            ],
            weightTweaks: [
              { metric: 'marketHeat', when: 'high', shift: 0.05 }
            ]
          }
        ]
      },
      {
        id: 'lean-into-referrals',
        label: 'Activate Referral Network',
        description: 'Mobilize alumni, investors, and internal advocates for signal boosts.',
        effects: [],
        outcomes: [
          {
            id: 'referral-surge',
            label: 'Referral surge ignites',
            description: 'Warm intros flood in and outshine the rival buzz.',
            weight: 50,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Pipeline builds sustainably.', delta: { pipeline: 6 } },
              { kind: 'resource', description: 'Morale perks up with community energy.', delta: { morale: 3 } }
            ],
            weightTweaks: [
              { metric: 'reputation', when: 'high', shift: 0.03 },
              { metric: 'marketHeat', when: 'low', shift: 0.03 }
            ]
          },
          {
            id: 'referral-fizzle',
            label: 'Referrals fizzle',
            description: 'Network is tapped out and you fall behind the hype cycle.',
            weight: 50,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Open roles linger longer.', delta: { openRoles: 1 } },
              { kind: 'modifier', description: 'Market heat creeps as people explore options.', delta: { marketHeat: 2 } }
            ],
            weightTweaks: [
              { metric: 'marketHeat', when: 'high', shift: 0.04 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'offsite-leak',
    name: 'Offsite Budget Leak',
    summary: 'Finance discovers the price tag on the upcoming talent offsite and is livid.',
    weight: 3,
    maxTurn: 20,
    options: [
      {
        id: 'own-narrative',
        label: 'Own the Narrative with ROI',
        description: 'Reframe the spend as retention insurance with metrics in tow.',
        effects: [],
        outcomes: [
          {
            id: 'roi-lands',
            label: 'ROI story lands',
            description: 'Finance signs off and morale rallies around the trip.',
            weight: 60,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Morale jumps at the validation.', delta: { morale: 6 } },
              { kind: 'modifier', description: 'Reputation with finance improves.', delta: { reputation: 2 } }
            ]
          },
          {
            id: 'roi-falls-flat',
            label: 'Finance still unimpressed',
            description: 'Controllers slash perks and demand new reporting.',
            weight: 40,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Morale slides from the downgrade.', delta: { morale: -4 } },
              { kind: 'modifier', description: 'Process debt rises from extra approvals.', delta: { processDebt: 2 } }
            ]
          }
        ]
      },
      {
        id: 'cancel-trip',
        label: 'Cancel and Reallocate',
        description: 'Pull the plug, switch to crew-specific micro-experiences, and redeploy funds.',
        effects: [
          { kind: 'resource', description: 'Savings go back to the balance sheet.', delta: { budget: 180_000 } }
        ],
        outcomes: [
          {
            id: 'micro-wins',
            label: 'Micro-events resonate',
            description: 'Smaller investments feel bespoke and teams stay energized.',
            weight: 45,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Morale dips only slightly.', delta: { morale: -1 } },
              { kind: 'resource', description: 'Velocity nudges up with fewer disruptions.', delta: { velocity: 2 } }
            ]
          },
          {
            id: 'cancel-backfires',
            label: 'Cancellation backfires',
            description: 'Slack fills with memes about the cancelled offsite.',
            weight: 55,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Morale tanks from broken promises.', delta: { morale: -6 } },
              { kind: 'resource', description: 'Talent brand takes a ding.', delta: { pipeline: -3 } }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'equity-refresh',
    name: 'Equity Refresh Rumblings',
    summary: 'Mid-level ICs are whispering about stale equity refreshes and recruiters hear the grumbles.',
    weight: 5,
    options: [
      {
        id: 'partner-finance',
        label: 'Partner with Finance on Refresh Plan',
        description: 'Co-design a targeted refresh focused on high-impact roles.',
        effects: [
          { kind: 'resource', description: 'Refresh grants hit the books.', delta: { budget: -260_000 } }
        ],
        outcomes: [
          {
            id: 'refresh-reassures',
            label: 'Refresh reassures key talent',
            description: 'Top performers stay and buzz about the fairness.',
            weight: 55,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Morale steadies across squads.', delta: { morale: 5 } },
              { kind: 'modifier', description: 'Reputation for retention grows.', delta: { reputation: 3 } }
            ]
          },
          {
            id: 'refresh-backlash',
            label: 'Refresh stirs backlash',
            description: 'Folks outside the focus group feel overlooked.',
            weight: 45,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Morale divides between teams.', delta: { morale: -3 } },
              { kind: 'modifier', description: 'Process debt creeps from new policy gates.', delta: { processDebt: 2 } }
            ]
          }
        ]
      },
      {
        id: 'delay-announce',
        label: 'Delay and Spin the Narrative',
        description: 'Promise a future review while highlighting career growth instead.',
        effects: [],
        outcomes: [
          {
            id: 'story-holds',
            label: 'Story holds long enough',
            description: 'Teams buy the roadmap for a quarter.',
            weight: 40,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Morale only dips slightly.', delta: { morale: -1 } },
              { kind: 'modifier', description: 'Reputation takes a minor bruise.', delta: { reputation: -1 } }
            ]
          },
          {
            id: 'story-cracks',
            label: 'Narrative cracks fast',
            description: 'Attrition chatter lights up Slack.',
            weight: 60,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Morale tanks.', delta: { morale: -6 } },
              { kind: 'resource', description: 'Open roles expand from departures.', delta: { openRoles: 2 } }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'diversity-push',
    name: 'Press Demands Representation Data',
    summary: 'A tech publication requests your latest diversity hiring metrics for a feature.',
    weight: 4,
    options: [
      {
        id: 'publish-report',
        label: 'Publish a Transparent Report',
        description: 'Share data with context, including commitments and misses.',
        effects: [],
        outcomes: [
          {
            id: 'transparency-praised',
            label: 'Transparency earns praise',
            description: 'Candid framing boosts trust with candidates.',
            weight: 55,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Pipeline diversifies meaningfully.', delta: { pipeline: 6 } },
              { kind: 'modifier', description: 'Reputation for honesty spikes.', delta: { reputation: 4 } }
            ],
            weightTweaks: [
              { metric: 'reputation', when: 'high', shift: 0.05 },
              { metric: 'processDebt', when: 'low', shift: 0.03 }
            ]
          },
          {
            id: 'transparency-scrutinized',
            label: 'Report fuels scrutiny',
            description: 'The article highlights misses and social media piles on.',
            weight: 45,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Morale dips from external pressure.', delta: { morale: -3 } },
              { kind: 'modifier', description: 'Market heat rises as competitors pounce.', delta: { marketHeat: 2 } }
            ],
            weightTweaks: [
              { metric: 'reputation', when: 'low', shift: 0.05 }
            ]
          }
        ]
      },
      {
        id: 'offer-deep-dive',
        label: 'Offer Embedded Deep Dive',
        description: 'Invite the reporter to observe programs and publish later.',
        effects: [
          { kind: 'resource', description: 'Program investment to tidy processes.', delta: { budget: -120_000 } }
        ],
        outcomes: [
          {
            id: 'deep-dive-glows',
            label: 'Coverage glows',
            description: 'Reporter gets impressed and highlights your momentum.',
            weight: 50,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Pipeline sees an inbound bump.', delta: { pipeline: 5 } },
              { kind: 'resource', description: 'Morale lifts from the positive press.', delta: { morale: 3 } }
            ]
          },
          {
            id: 'deep-dive-stings',
            label: 'Coverage stings',
            description: 'Exposure reveals weak spots you hoped to hide.',
            weight: 50,
            tone: 'failure',
            effects: [
              { kind: 'modifier', description: 'Reputation slips amid criticism.', delta: { reputation: -3 } },
              { kind: 'modifier', description: 'Process debt grows from reactive fixes.', delta: { processDebt: 2 } }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'investor-roadmap',
    name: 'Investor Asks for Hiring Ramp Rebuild',
    summary: 'A new investor wants a revised headcount ramp aligned to an aggressive revenue plan.',
    weight: 4,
    options: [
      {
        id: 'overprepare-model',
        label: 'Overprepare the Model',
        description: 'Pull finance, product, and talent into a weekend modeling sprint.',
        effects: [
          { kind: 'resource', description: 'Cross-functional time goes to modeling.', delta: { velocity: -3 } }
        ],
        outcomes: [
          {
            id: 'model-wins',
            label: 'Model wins backing',
            description: 'Investor applauds the rigor and buys the plan.',
            weight: 60,
            tone: 'success',
            effects: [
              { kind: 'modifier', description: 'Investor confidence soars.', delta: { reputation: 4 } },
              { kind: 'resource', description: 'Budget buffer arrives for execution.', delta: { budget: 200_000 } }
            ]
          },
          {
            id: 'model-overfit',
            label: 'Model overfits assumptions',
            description: 'Extra scrutiny uncovers shaky data and erodes trust.',
            weight: 40,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Morale dips after the grilling.', delta: { morale: -3 } },
              { kind: 'modifier', description: 'Process debt builds around reporting cadences.', delta: { processDebt: 2 } }
            ]
          }
        ]
      },
      {
        id: 'deflect-to-ops',
        label: 'Deflect to Operations Review',
        description: 'Push the request into a broader operating plan review next month.',
        effects: [],
        outcomes: [
          {
            id: 'delay-accepted',
            label: 'Delay gets accepted',
            description: 'Investor agrees to revisit and gives you breathing room.',
            weight: 45,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Velocity remains focused on delivery.', delta: { velocity: 1 } },
              { kind: 'resource', description: 'Timeline percent guidance eases pressure.', delta: { morale: 2 } }
            ]
          },
          {
            id: 'delay-rebuffed',
            label: 'Delay gets rebuffed',
            description: 'Investor escalates to the board for immediate answers.',
            weight: 55,
            tone: 'failure',
            effects: [
              { kind: 'modifier', description: 'Reputation drops under scrutiny.', delta: { reputation: -4 } },
              { kind: 'modifier', description: 'Market heat rises as rumors spread.', delta: { marketHeat: 2 } }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'engineering-escalation',
    name: 'Engineering Escalates Hiring Pain',
    summary: 'Eng leadership claims recruiting does not understand their bar and escalates to the COO.',
    weight: 6,
    options: [
      {
        id: 'embed-recruiter',
        label: 'Embed Senior Recruiter in Engineering',
        description: 'Temporarily reassign a veteran recruiter to shadow the teams.',
        effects: [
          { kind: 'resource', description: 'Other pipelines slow while coverage shifts.', delta: { pipeline: -2 } }
        ],
        outcomes: [
          {
            id: 'embed-success',
            label: 'Embedded recruiter repairs trust',
            description: 'Alignment improves and pass-through rates climb.',
            weight: 55,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Time-to-fill drops as loops tighten.', delta: { timeToFill: -4 } },
              { kind: 'resource', description: 'Morale improves on both sides.', delta: { morale: 3 } }
            ]
          },
          {
            id: 'embed-overwhelmed',
            label: 'Embedded recruiter overwhelmed',
            description: 'Expectations balloon and backlog grows elsewhere.',
            weight: 45,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Open roles pile up outside eng.', delta: { openRoles: 2 } },
              { kind: 'modifier', description: 'Process debt increases from ad-hoc changes.', delta: { processDebt: 2 } }
            ]
          }
        ]
      },
      {
        id: 'manager-roadshow',
        label: 'Host Manager Listening Roadshow',
        description: 'Facilitate listening sessions and co-create new scorecards.',
        effects: [],
        outcomes: [
          {
            id: 'roadshow-buys-trust',
            label: 'Roadshow buys trust',
            description: 'Managers feel heard and collaborate on better briefs.',
            weight: 50,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Pipeline quality improves.', delta: { pipeline: 4 } },
              { kind: 'resource', description: 'Morale climbs with shared ownership.', delta: { morale: 4 } }
            ]
          },
          {
            id: 'roadshow-exposes-more',
            label: 'Roadshow exposes deeper issues',
            description: 'Managers escalate even harder with new examples.',
            weight: 50,
            tone: 'failure',
            effects: [
              { kind: 'modifier', description: 'Reputation takes a hit with execs.', delta: { reputation: -3 } },
              { kind: 'resource', description: 'Velocity slips while leadership huddles.', delta: { velocity: -3 } }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'campus-fair',
    name: 'Tier-One Campus Fair Invite',
    summary: 'A top university offers you prime booth space—but flights leave tomorrow.',
    weight: 4,
    maxTurn: 15,
    options: [
      {
        id: 'send-squad',
        label: 'Send a Hybrid Squad',
        description: 'Scramble a mix of recruiters and alumni to show up in person.',
        effects: [
          { kind: 'resource', description: 'Travel and swag budgets spike.', delta: { budget: -110_000 } }
        ],
        outcomes: [
          {
            id: 'campus-surge',
            label: 'Campus surge succeeds',
            description: 'Lines form and your booth becomes the hot ticket.',
            weight: 55,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Pipeline fills with junior talent.', delta: { pipeline: 9 } },
              { kind: 'resource', description: 'Morale lifts from the buzz.', delta: { morale: 2 } }
            ]
          },
          {
            id: 'campus-flat',
            label: 'Campus debut falls flat',
            description: 'Weather kills foot traffic and swag ends up in recycling.',
            weight: 45,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Pipeline bump disappoints.', delta: { pipeline: -2 } },
              { kind: 'resource', description: 'Budget waste stings.', delta: { budget: -40_000 } }
            ]
          }
        ]
      },
      {
        id: 'host-virtually',
        label: 'Pivot to Virtual Sponsor',
        description: 'Sponsor the event remotely with curated workshops and lightning talks.',
        effects: [],
        outcomes: [
          {
            id: 'virtual-resonates',
            label: 'Virtual experience resonates',
            description: 'Sessions trend on social and applications flow in.',
            weight: 50,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Pipeline grows steadily.', delta: { pipeline: 5 } },
              { kind: 'modifier', description: 'Reputation with early-career talent improves.', delta: { reputation: 2 } }
            ]
          },
          {
            id: 'virtual-ignored',
            label: 'Virtual booth ignored',
            description: 'Poor attendance wastes prep time.',
            weight: 50,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Velocity slows after wasted prep.', delta: { velocity: -2 } },
              { kind: 'resource', description: 'Pipeline barely budges.', delta: { pipeline: -1 } }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'visa-backlog',
    name: 'Visa Backlog Crisis',
    summary: 'Immigration counsel warns of a new visa backlog that could delay multiple hires.',
    weight: 5,
    options: [
      {
        id: 'expedite-processing',
        label: 'Fund Expedited Processing',
        description: 'Pay premium fees for faster visa handling and hire a specialist.',
        effects: [
          { kind: 'resource', description: 'Premium processing fees stack up.', delta: { budget: -150_000 } }
        ],
        outcomes: [
          {
            id: 'expedite-succeeds',
            label: 'Expedite succeeds',
            description: 'Visas clear in time and candidates stay warm.',
            weight: 60,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Open roles close on schedule.', delta: { openRoles: -2 } },
              { kind: 'resource', description: 'Morale rises with the save.', delta: { morale: 3 } }
            ]
          },
          {
            id: 'expedite-stalled',
            label: 'Expedite still stalls',
            description: 'Government delays make the spend feel futile.',
            weight: 40,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Time-to-fill spikes from the wait.', delta: { timeToFill: 6 } },
              { kind: 'resource', description: 'Budget hit deepens.', delta: { budget: -80_000 } }
            ]
          }
        ]
      },
      {
        id: 'shift-strategy',
        label: 'Shift Strategy to Remote Hubs',
        description: 'Pause affected hires and accelerate recruiting in visa-safe regions.',
        effects: [],
        outcomes: [
          {
            id: 'remote-succeeds',
            label: 'Remote strategy succeeds',
            description: 'Regional hubs spin up quickly and keep output steady.',
            weight: 45,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Velocity stays intact.', delta: { velocity: 2 } },
              { kind: 'modifier', description: 'Process debt increases from new workflows.', delta: { processDebt: 1 } }
            ]
          },
          {
            id: 'remote-struggles',
            label: 'Remote pivot struggles',
            description: 'Teams balk at timezone coverage gaps.',
            weight: 55,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Velocity dips from coordination drag.', delta: { velocity: -4 } },
              { kind: 'resource', description: 'Pipeline loses top candidates.', delta: { pipeline: -3 } }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'salary-benchmark',
    name: 'Salary Benchmark Shock',
    summary: 'New compensation data shows your ranges are 10% below market for senior talent.',
    weight: 6,
    options: [
      {
        id: 'raise-bands',
        label: 'Raise Bands Immediately',
        description: 'Partner with finance and roll out new offers starting this week.',
        effects: [
          { kind: 'resource', description: 'Comp adjustments hit the budget forecast.', delta: { budget: -250_000 } }
        ],
        outcomes: [
          {
            id: 'bands-boost-hiring',
            label: 'Raises boost hiring',
            description: 'Win rates climb and candidate sentiment improves.',
            weight: 60,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Pipeline converts faster.', delta: { pipeline: 5 } },
              { kind: 'resource', description: 'Velocity benefits from stronger hires.', delta: { velocity: 3 } }
            ]
          },
          {
            id: 'bands-trigger-drama',
            label: 'Raises trigger internal drama',
            description: 'Existing employees demand parity adjustments immediately.',
            weight: 40,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Morale rollercoaster ensues.', delta: { morale: -4 } },
              { kind: 'modifier', description: 'Process debt grows with comp appeals.', delta: { processDebt: 3 } }
            ]
          }
        ]
      },
      {
        id: 'stall-and-spin',
        label: 'Stall and Spin on Total Rewards',
        description: 'Highlight benefits and equity, promising a formal review later.',
        effects: [],
        outcomes: [
          {
            id: 'spin-holds',
            label: 'Spin holds steady',
            description: 'Teams stay patient and you buy a quarter of time.',
            weight: 45,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Budget stays intact for now.', delta: { budget: 60_000 } },
              { kind: 'resource', description: 'Pipeline drag is manageable.', delta: { pipeline: -1 } }
            ]
          },
          {
            id: 'spin-collapses',
            label: 'Spin collapses quickly',
            description: 'Candidates demand parity or walk away.',
            weight: 55,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Pipeline conversion nosedives.', delta: { pipeline: -6 } },
              { kind: 'resource', description: 'Open roles expand as offers rescind.', delta: { openRoles: 2 } }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'referral-drought',
    name: 'Referral Drought',
    summary: 'Referral submissions hit a new low and the program feels invisible.',
    weight: 5,
    options: [
      {
        id: 'relaunch-program',
        label: 'Relaunch with Tiered Bonuses',
        description: 'Introduce escalating bonuses and public shout-outs.',
        effects: [
          { kind: 'resource', description: 'New bonus pool gets funded.', delta: { budget: -140_000 } }
        ],
        outcomes: [
          {
            id: 'relaunch-excites',
            label: 'Relaunch excites the org',
            description: 'Referrals surge and new names flood the tracker.',
            weight: 55,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Pipeline lifts broadly.', delta: { pipeline: 7 } },
              { kind: 'resource', description: 'Morale boosts from celebrating wins.', delta: { morale: 3 } }
            ]
          },
          {
            id: 'relaunch-fizzles',
            label: 'Relaunch fizzles',
            description: 'Few people notice and the spend feels wasted.',
            weight: 45,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Pipeline barely moves.', delta: { pipeline: -1 } },
              { kind: 'resource', description: 'Budget burn lingers.', delta: { budget: -40_000 } }
            ]
          }
        ]
      },
      {
        id: 'gamify-network',
        label: 'Gamify with Leaderboards',
        description: 'Roll out referral leaderboards, monthly spotlights, and manager goals.',
        effects: [],
        outcomes: [
          {
            id: 'gamify-energizes',
            label: 'Gamification energizes teams',
            description: 'Managers compete playfully and intros double.',
            weight: 50,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Pipeline builds steady momentum.', delta: { pipeline: 5 } },
              { kind: 'modifier', description: 'Reputation for creative programs grows.', delta: { reputation: 2 } }
            ]
          },
          {
            id: 'gamify-annoys',
            label: 'Gamification annoys seniors',
            description: 'Leaderboards feel childish and participation drops further.',
            weight: 50,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Morale dips from eye-roll factor.', delta: { morale: -3 } },
              { kind: 'resource', description: 'Pipeline slips again.', delta: { pipeline: -3 } }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'internal-poach',
    name: 'Internal Poach Attempt',
    summary: 'Operations leader tries to poach two senior recruiters for a stealth project.',
    weight: 4,
    options: [
      {
        id: 'counter-offer-team',
        label: 'Counter and Keep the Team',
        description: 'Offer retention bonuses and tie roles to high-visibility work.',
        effects: [
          { kind: 'resource', description: 'Retention spend hits the budget.', delta: { budget: -160_000 } }
        ],
        outcomes: [
          {
            id: 'counter-success',
            label: 'Counteroffer holds',
            description: 'Recruiters stay and double down on delivery.',
            weight: 55,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Pipeline stability returns.', delta: { pipeline: 4 } },
              { kind: 'resource', description: 'Morale stabilizes with loyalty.', delta: { morale: 3 } }
            ]
          },
          {
            id: 'counter-fails',
            label: 'Counteroffer fails',
            description: 'They take the new roles anyway, citing fresh challenges.',
            weight: 45,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Pipeline backslides from coverage gaps.', delta: { pipeline: -5 } },
              { kind: 'resource', description: 'Open roles rise as you backfill.', delta: { openRoles: 2 } }
            ]
          }
        ]
      },
      {
        id: 'let-transition',
        label: 'Let Them Transition',
        description: 'Support the move and use it to restructure the team.',
        effects: [],
        outcomes: [
          {
            id: 'transition-smooth',
            label: 'Transition goes smoothly',
            description: 'You backfill with hungry recruiters and refresh playbooks.',
            weight: 45,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Pipeline rebuilds with new energy.', delta: { pipeline: 3 } },
              { kind: 'modifier', description: 'Process debt drops with fresh eyes.', delta: { processDebt: -2 } }
            ]
          },
          {
            id: 'transition-mess',
            label: 'Transition becomes a mess',
            description: 'Knowledge walks out the door and training drags.',
            weight: 55,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Time-to-fill balloons while new hires ramp.', delta: { timeToFill: 5 } },
              { kind: 'resource', description: 'Morale dips from turnover fatigue.', delta: { morale: -4 } }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'supplier-crisis',
    name: 'Vendor Data Breach',
    summary: 'Your background-check vendor just announced a breach impacting candidate data.',
    weight: 5,
    options: [
      {
        id: 'switch-vendor',
        label: 'Switch Vendors Immediately',
        description: 'Pause onboarding, spin up a new supplier, and re-screen recent hires.',
        effects: [
          { kind: 'resource', description: 'Emergency vendor onboarding costs mount.', delta: { budget: -180_000 } }
        ],
        outcomes: [
          {
            id: 'switch-smooth',
            label: 'Switch goes smoothly',
            description: 'New vendor spins up quickly and candidates appreciate transparency.',
            weight: 50,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Time-to-fill impact stays minimal.', delta: { timeToFill: 1 } },
              { kind: 'modifier', description: 'Reputation for swift action grows.', delta: { reputation: 3 } }
            ]
          },
          {
            id: 'switch-chaotic',
            label: 'Switch gets chaotic',
            description: 'Implementation drags and onboarding delays stack.',
            weight: 50,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Time-to-fill leaps with rechecks.', delta: { timeToFill: 6 } },
              { kind: 'resource', description: 'Morale dips from the scramble.', delta: { morale: -3 } }
            ]
          }
        ]
      },
      {
        id: 'own-communication',
        label: 'Own the Communication',
        description: 'Stay with the vendor but over-communicate remediation steps.',
        effects: [],
        outcomes: [
          {
            id: 'communication-trust',
            label: 'Communication rebuilds trust',
            description: 'Candidates appreciate the honesty and stay the course.',
            weight: 55,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Pipeline impact stays contained.', delta: { pipeline: -1 } },
              { kind: 'modifier', description: 'Reputation for transparency rises.', delta: { reputation: 2 } }
            ]
          },
          {
            id: 'communication-falls-flat',
            label: 'Message falls flat',
            description: 'Candidates panic and delay start dates.',
            weight: 45,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Pipeline leaks offers.', delta: { pipeline: -5 } },
              { kind: 'modifier', description: 'Market heat climbs with gossip.', delta: { marketHeat: 2 } }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'product-delay',
    name: 'Product Deadline Pulled Forward',
    summary: 'Product just pulled a major launch forward, demanding more engineers yesterday.',
    weight: 6,
    options: [
      {
        id: 'double-down-hiring',
        label: 'Double Down on Hiring Sprints',
        description: 'Stack interview days, weekend panels, and executive closers.',
        effects: [
          { kind: 'resource', description: 'Weekend and overtime stipends.', delta: { budget: -130_000 } }
        ],
        outcomes: [
          {
            id: 'sprint-delivers',
            label: 'Sprint delivers hires',
            description: 'Compressed loops land several key engineers.',
            weight: 55,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Open roles shrink quickly.', delta: { openRoles: -3 } },
              { kind: 'resource', description: 'Velocity perks up near term.', delta: { velocity: 3 } }
            ]
          },
          {
            id: 'sprint-burns-out',
            label: 'Sprint burns everyone out',
            description: 'Team fatigue spikes and decisions wobble.',
            weight: 45,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Morale plummets.', delta: { morale: -6 } },
              { kind: 'modifier', description: 'Process debt grows from rushed loops.', delta: { processDebt: 3 } }
            ]
          }
        ]
      },
      {
        id: 'reset-roadmap',
        label: 'Reset Roadmap Expectations',
        description: 'Negotiate to re-scope launch milestones with talent realities.',
        effects: [],
        outcomes: [
          {
            id: 'reset-accepted',
            label: 'Reset gets accepted',
            description: 'Roadmap shrinks slightly and teams breathe.',
            weight: 50,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Morale stabilizes.', delta: { morale: 4 } },
              { kind: 'resource', description: 'Velocity slows but stays controlled.', delta: { velocity: -1 } }
            ]
          },
          {
            id: 'reset-rejected',
            label: 'Reset gets rejected',
            description: 'Product escalates and piles on last-minute demands.',
            weight: 50,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Open roles expand with emergency reqs.', delta: { openRoles: 2 } },
              { kind: 'modifier', description: 'Reputation takes a beating.', delta: { reputation: -4 } }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'security-review',
    name: 'Security Review Roadblock',
    summary: 'CISO flags gaps in candidate device policies and halts onboarding.',
    weight: 4,
    options: [
      {
        id: 'prioritize-hire',
        label: 'Prioritize Security Hire',
        description: 'Pull forward a security operations role to own the fix.',
        effects: [
          { kind: 'resource', description: 'Reallocate headcount to security.', delta: { openRoles: 1 } }
        ],
        outcomes: [
          {
            id: 'hire-fixes-gap',
            label: 'Specialist fixes the gap',
            description: 'New hire builds guardrails and onboarding resumes.',
            weight: 55,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Time-to-fill impact minimal.', delta: { timeToFill: -2 } },
              { kind: 'modifier', description: 'Reputation with security spikes.', delta: { reputation: 2 } }
            ],
            weightTweaks: [
              { metric: 'processDebt', when: 'low', shift: 0.05 }
            ]
          },
          {
            id: 'hire-slow-to-ramp',
            label: 'Hire ramps slowly',
            description: 'Ramp timelines slip and teams get impatient.',
            weight: 45,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Velocity dips during ramp.', delta: { velocity: -3 } },
              { kind: 'resource', description: 'Morale sours at the bureaucracy.', delta: { morale: -2 } }
            ],
            weightTweaks: [
              { metric: 'processDebt', when: 'high', shift: 0.05 }
            ]
          }
        ]
      },
      {
        id: 'borrow-security',
        label: 'Borrow Security Squad Temporarily',
        description: 'Shift an existing team to patch the policy without new hires.',
        effects: [
          { kind: 'resource', description: 'Security roadmap slips.', delta: { velocity: -2 } }
        ],
        outcomes: [
          {
            id: 'borrow-works',
            label: 'Borrowed squad works',
            description: 'They patch the gap in record time.',
            weight: 50,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Pipeline resumes quickly.', delta: { pipeline: 3 } },
              { kind: 'resource', description: 'Morale appreciates the teamwork.', delta: { morale: 2 } }
            ],
            weightTweaks: [
              { metric: 'processDebt', when: 'low', shift: 0.04 }
            ]
          },
          {
            id: 'borrow-backfires',
            label: 'Borrow backfires',
            description: 'Detours derail critical security roadmap items.',
            weight: 50,
            tone: 'failure',
            effects: [
              { kind: 'modifier', description: 'Process debt spikes from quick fixes.', delta: { processDebt: 3 } },
              { kind: 'modifier', description: 'Market heat rises as word leaks.', delta: { marketHeat: 2 } }
            ],
            weightTweaks: [
              { metric: 'processDebt', when: 'high', shift: 0.04 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'candidate-ghosting',
    name: 'Candidate Ghosting Spike',
    summary: 'Three finalists ghost in a row, citing “another process that moved faster.”',
    weight: 6,
    options: [
      {
        id: 'audit-experience',
        label: 'Audit the Candidate Experience',
        description: 'Run shadow interviews and remove dead air inside the loop.',
        effects: [],
        outcomes: [
          {
            id: 'audit-pays-off',
            label: 'Audit pays off',
            description: 'You fix laggy steps and rebuild trust quickly.',
            weight: 60,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Pipeline conversion jumps.', delta: { pipeline: 6 } },
              { kind: 'resource', description: 'Time-to-fill trims down.', delta: { timeToFill: -3 } }
            ]
          },
          {
            id: 'audit-exposes-mess',
            label: 'Audit exposes mess',
            description: 'Findings show deeper alignment issues with hiring managers.',
            weight: 40,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Morale dips from loop drama.', delta: { morale: -3 } },
              { kind: 'modifier', description: 'Process debt rises before fixes land.', delta: { processDebt: 2 } }
            ]
          }
        ]
      },
      {
        id: 'fast-track-offers',
        label: 'Fast-Track Offers',
        description: 'Introduce same-day offers for bar-raising candidates.',
        effects: [
          { kind: 'resource', description: 'Accelerated offers risk comp creep.', delta: { budget: -100_000 } }
        ],
        outcomes: [
          {
            id: 'fast-track-success',
            label: 'Fast-track sticks the landing',
            description: 'Conversion climbs and ghosting vanishes.',
            weight: 55,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Open roles close faster.', delta: { openRoles: -2 } },
              { kind: 'resource', description: 'Velocity holds steady with quick fills.', delta: { velocity: 2 } }
            ]
          },
          {
            id: 'fast-track-backfires',
            label: 'Fast-track backfires',
            description: 'Hasty decisions trigger more reneges later.',
            weight: 45,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Pipeline churn reappears.', delta: { pipeline: -4 } },
              { kind: 'resource', description: 'Morale drops from false starts.', delta: { morale: -4 } }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'exec-shortlist',
    name: 'Executive Shortlist Meltdown',
    summary: 'The executive search shortlist lands and the CEO hates every name on it.',
    weight: 4,
    options: [
      {
        id: 'expand-search',
        label: 'Expand the Search Firm Mandate',
        description: 'Broaden the profile and pay for an elite scout add-on.',
        effects: [
          { kind: 'resource', description: 'Search fees balloon.', delta: { budget: -300_000 } }
        ],
        outcomes: [
          {
            id: 'expanded-delights',
            label: 'Expanded search delights',
            description: 'Fresh names land and the CEO gets excited again.',
            weight: 55,
            tone: 'success',
            effects: [
              { kind: 'modifier', description: 'Reputation climbs with leadership.', delta: { reputation: 3 } },
              { kind: 'resource', description: 'Pipeline quality jumps.', delta: { pipeline: 4 } }
            ]
          },
          {
            id: 'expanded-stalls',
            label: 'Expanded search stalls',
            description: 'Firm drags and charges more retainers.',
            weight: 45,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Open roles stay blocked.', delta: { openRoles: 1 } },
              { kind: 'resource', description: 'Budget burn accelerates.', delta: { budget: -80_000 } }
            ]
          }
        ]
      },
      {
        id: 'reset-profile',
        label: 'Reset the Profile Internally',
        description: 'Facilitate a workshop with the CEO to co-create a refreshed profile.',
        effects: [],
        outcomes: [
          {
            id: 'reset-gains-alignment',
            label: 'Reset gains alignment',
            description: 'Everyone leaves aligned and energized.',
            weight: 50,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Velocity recovers from clarity.', delta: { velocity: 2 } },
              { kind: 'resource', description: 'Morale improves across the search team.', delta: { morale: 3 } }
            ]
          },
          {
            id: 'reset-open-wounds',
            label: 'Reset opens new wounds',
            description: 'Differences deepen and the role goes on ice.',
            weight: 50,
            tone: 'failure',
            effects: [
              { kind: 'modifier', description: 'Reputation dips with execs.', delta: { reputation: -3 } },
              { kind: 'resource', description: 'Pipeline empties while waiting.', delta: { pipeline: -4 } }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'board-target',
    name: 'Board Sets Surprise Hiring Target',
    summary: 'The board demands 10 additional senior go-to-market hires before quarter end.',
    weight: 5,
    options: [
      {
        id: 'agree-stretch',
        label: 'Agree and Stretch Plan',
        description: 'Make the board happy and scramble to deliver.',
        effects: [
          { kind: 'resource', description: 'Agency retainers and spiffs stack up.', delta: { budget: -260_000 } }
        ],
        outcomes: [
          {
            id: 'stretch-achieved',
            label: 'Stretch actually achieved',
            description: 'Team rallies and the board applauds.',
            weight: 45,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Open roles disappear fast.', delta: { openRoles: -4 } },
              { kind: 'modifier', description: 'Reputation soars with leadership.', delta: { reputation: 4 } }
            ]
          },
          {
            id: 'stretch-collapses',
            label: 'Stretch collapses',
            description: 'Quality slips and attrition rumors start.',
            weight: 55,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Morale takes a beating.', delta: { morale: -5 } },
              { kind: 'modifier', description: 'Process debt skyrockets from rushed hires.', delta: { processDebt: 4 } }
            ]
          }
        ]
      },
      {
        id: 'negotiate-reality',
        label: 'Negotiate for Reality',
        description: 'Present scenario planning and propose a phased approach.',
        effects: [],
        outcomes: [
          {
            id: 'board-convinced',
            label: 'Board gets convinced',
            description: 'They green-light a phased plan with add-on incentives.',
            weight: 50,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Budget forms for enablement.', delta: { budget: 150_000 } },
              { kind: 'resource', description: 'Morale appreciates the sanity.', delta: { morale: 4 } }
            ]
          },
          {
            id: 'board-doubles-down',
            label: 'Board doubles down',
            description: 'They escalate to CEO and demand more control.',
            weight: 50,
            tone: 'failure',
            effects: [
              { kind: 'modifier', description: 'Reputation takes a hit with investors.', delta: { reputation: -4 } },
              { kind: 'modifier', description: 'Market heat jumps from leaked tension.', delta: { marketHeat: 3 } }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'brand-blowup',
    name: 'Viral Tweet Storm',
    summary: 'A viral tweet calls your interview loop “chaos cosplay,” racking up views.',
    weight: 5,
    options: [
      {
        id: 'issue-statement',
        label: 'Issue a Rapid Statement',
        description: 'Acknowledge, share fixes, and invite dialogue.',
        effects: [],
        outcomes: [
          {
            id: 'statement-quells',
            label: 'Statement quells the storm',
            description: 'Transparency wins praise and the thread cools.',
            weight: 55,
            tone: 'success',
            effects: [
              { kind: 'modifier', description: 'Reputation rebounds quickly.', delta: { reputation: 3 } },
              { kind: 'resource', description: 'Pipeline impact minimal.', delta: { pipeline: -1 } }
            ]
          },
          {
            id: 'statement-stretches',
            label: 'Statement stretches conversation',
            description: 'Critics dissect every word and churn continues.',
            weight: 45,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Pipeline shrinks noticeably.', delta: { pipeline: -5 } },
              { kind: 'resource', description: 'Morale dips from public scrutiny.', delta: { morale: -3 } }
            ]
          }
        ]
      },
      {
        id: 'highlight-employees',
        label: 'Highlight Employee Voices',
        description: 'Amplify positive experience stories across channels.',
        effects: [],
        outcomes: [
          {
            id: 'voices-resonate',
            label: 'Voices resonate',
            description: 'Employee testimonials drown out the negativity.',
            weight: 50,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Pipeline recovers through advocacy.', delta: { pipeline: 4 } },
              { kind: 'resource', description: 'Morale climbs with solidarity.', delta: { morale: 4 } }
            ]
          },
          {
            id: 'voices-ignored',
            label: 'Voices get ignored',
            description: 'Campaign feels inauthentic and posts flop.',
            weight: 50,
            tone: 'failure',
            effects: [
              { kind: 'modifier', description: 'Reputation suffers further.', delta: { reputation: -3 } },
              { kind: 'resource', description: 'Pipeline dip worsens.', delta: { pipeline: -3 } }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'glassdoor-storm',
    name: 'Glassdoor Storm',
    summary: 'A scathing anonymous review trends, accusing leadership of bait-and-switch offers.',
    weight: 4,
    options: [
      {
        id: 'respond-transparently',
        label: 'Respond Transparently',
        description: 'Address the critique publicly and invite direct feedback.',
        effects: [],
        outcomes: [
          {
            id: 'response-restores',
            label: 'Response restores confidence',
            description: 'Candidates appreciate the candid reply.',
            weight: 55,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Pipeline dip stays shallow.', delta: { pipeline: -1 } },
              { kind: 'modifier', description: 'Reputation steadies with authenticity.', delta: { reputation: 2 } }
            ]
          },
          {
            id: 'response-invites-dogs',
            label: 'Response invites more heat',
            description: 'Thread attracts more critics and demands proof.',
            weight: 45,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Morale dips from ongoing drama.', delta: { morale: -3 } },
              { kind: 'resource', description: 'Pipeline retreats sharply.', delta: { pipeline: -4 } }
            ]
          }
        ]
      },
      {
        id: 'ignore-cycle',
        label: 'Ignore and Focus Internally',
        description: 'Redirect energy to fixing the underlying concern quietly.',
        effects: [],
        outcomes: [
          {
            id: 'ignore-works',
            label: 'Internal fixes speak louder',
            description: 'Employees notice the action and chatter fades.',
            weight: 45,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Morale improves from visible fixes.', delta: { morale: 3 } },
              { kind: 'resource', description: 'Pipeline recovers slowly.', delta: { pipeline: 2 } }
            ]
          },
          {
            id: 'ignore-backfires',
            label: 'Silence backfires',
            description: 'Silence is read as guilt and the story lingers.',
            weight: 55,
            tone: 'failure',
            effects: [
              { kind: 'modifier', description: 'Reputation sinks further.', delta: { reputation: -3 } },
              { kind: 'resource', description: 'Open roles stall out.', delta: { openRoles: 1 } }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'agency-misstep',
    name: 'Agency Sends Confidential Candidate',
    summary: 'Your agency partner accidentally sends a candidate working at a key customer.',
    weight: 3,
    options: [
      {
        id: 'fire-agency',
        label: 'Fire the Agency Immediately',
        description: 'Cut ties, eat the retainer, and go public with the code of conduct.',
        effects: [
          { kind: 'resource', description: 'Retainer forfeited and legal fees.', delta: { budget: -120_000 } }
        ],
        outcomes: [
          {
            id: 'clean-break',
            label: 'Clean break signals standards',
            description: 'Partners applaud the firm stance.',
            weight: 50,
            tone: 'success',
            effects: [
              { kind: 'modifier', description: 'Reputation rises with customers.', delta: { reputation: 3 } },
              { kind: 'resource', description: 'Pipeline rebuilds from owned channels.', delta: { pipeline: 2 } }
            ]
          },
          {
            id: 'break-hurts',
            label: 'Break hurts momentum',
            description: 'Losing the agency slows critical searches.',
            weight: 50,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Open roles linger.', delta: { openRoles: 1 } },
              { kind: 'resource', description: 'Budget hit stings deeper.', delta: { budget: -60_000 } }
            ]
          }
        ]
      },
      {
        id: 'coach-agency',
        label: 'Coach and Tighten Controls',
        description: 'Keep the agency but implement stricter screening of submissions.',
        effects: [],
        outcomes: [
          {
            id: 'coaching-works',
            label: 'Coaching works',
            description: 'Agency cleans up its act and delivers quality.',
            weight: 55,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Pipeline regains momentum.', delta: { pipeline: 3 } },
              { kind: 'resource', description: 'Morale recovers from the save.', delta: { morale: 2 } }
            ]
          },
          {
            id: 'coaching-fails',
            label: 'Coaching fails',
            description: 'More mistakes surface and credibility fades.',
            weight: 45,
            tone: 'failure',
            effects: [
              { kind: 'modifier', description: 'Reputation takes another hit.', delta: { reputation: -2 } },
              { kind: 'modifier', description: 'Process debt grows with extra reviews.', delta: { processDebt: 2 } }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'recruiter-out',
    name: 'Senior Recruiter Emergency Leave',
    summary: 'Your top recruiter just took emergency leave during peak hiring.',
    weight: 5,
    options: [
      {
        id: 'redistribute-load',
        label: 'Redistribute the Load',
        description: 'Spread reqs across the team and coach managers to self-serve.',
        effects: [],
        outcomes: [
          {
            id: 'redistribute-works',
            label: 'Redistribution works',
            description: 'Team steps up and keeps the queue moving.',
            weight: 50,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Pipeline slows only slightly.', delta: { pipeline: -1 } },
              { kind: 'resource', description: 'Morale rises from shared ownership.', delta: { morale: 3 } }
            ]
          },
          {
            id: 'redistribute-overload',
            label: 'Redistribution overloads team',
            description: 'Everyone burns out juggling extra loops.',
            weight: 50,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Pipeline sputters.', delta: { pipeline: -5 } },
              { kind: 'resource', description: 'Velocity slips from context switching.', delta: { velocity: -3 } }
            ]
          }
        ]
      },
      {
        id: 'bring-temp',
        label: 'Bring in Contract Coverage',
        description: 'Hire a seasoned contractor to keep critical roles moving.',
        effects: [
          { kind: 'resource', description: 'Contract rate premium.', delta: { budget: -90_000 } }
        ],
        outcomes: [
          {
            id: 'contractor-great',
            label: 'Contractor excels',
            description: 'Coverage is seamless and candidates barely notice.',
            weight: 55,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Pipeline remains healthy.', delta: { pipeline: 3 } },
              { kind: 'resource', description: 'Open roles close on time.', delta: { openRoles: -1 } }
            ]
          },
          {
            id: 'contractor-misfires',
            label: 'Contractor misfires',
            description: 'They misread culture and push poor fits.',
            weight: 45,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Pipeline quality drops.', delta: { pipeline: -3 } },
              { kind: 'modifier', description: 'Process debt grows with cleanup.', delta: { processDebt: 2 } }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'grad-offers',
    name: 'New Grad Offer Explosion',
    summary: 'Graduating class response is overwhelming—far more acceptances than headcount slots.',
    weight: 3,
    minTurn: 5,
    options: [
      {
        id: 'accelerate-headcount',
        label: 'Accelerate Headcount Approvals',
        description: 'Take the win and lobby for more slots immediately.',
        effects: [
          { kind: 'resource', description: 'Budget stretches to cover early starts.', delta: { budget: -170_000 } }
        ],
        outcomes: [
          {
            id: 'accelerate-approved',
            label: 'Acceleration approved',
            description: 'Finance applauds the proactive call.',
            weight: 50,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Open roles shrink for future cycles.', delta: { openRoles: -2 } },
              { kind: 'resource', description: 'Morale jumps with fresh energy.', delta: { morale: 4 } }
            ]
          },
          {
            id: 'accelerate-denied',
            label: 'Acceleration denied',
            description: 'Finance balks and forces deferrals.',
            weight: 50,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Pipeline clogs with deferred talent.', delta: { pipeline: -2 } },
              { kind: 'resource', description: 'Velocity suffers from administrative churn.', delta: { velocity: -2 } }
            ]
          }
        ]
      },
      {
        id: 'stage-deferrals',
        label: 'Stage Deferrals and Alumni Paths',
        description: 'Offer split start dates, internships, and alumni community engagement.',
        effects: [],
        outcomes: [
          {
            id: 'deferrals-smooth',
            label: 'Deferrals go smoothly',
            description: 'Graduates stay engaged and talk up the company.',
            weight: 55,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Pipeline loyalty deepens.', delta: { pipeline: 3 } },
              { kind: 'modifier', description: 'Reputation with universities soars.', delta: { reputation: 3 } }
            ]
          },
          {
            id: 'deferrals-backfire',
            label: 'Deferrals backfire',
            description: 'Frustrated grads sign elsewhere.',
            weight: 45,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Pipeline shrinks sharply.', delta: { pipeline: -5 } },
              { kind: 'resource', description: 'Morale dips from the missed opportunity.', delta: { morale: -3 } }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'comp-freeze',
    name: 'CFO Freezes Hiring Spend',
    summary: 'CFO institutes a surprise freeze on all discretionary hiring spend.',
    weight: 6,
    options: [
      {
        id: 'reallocate-budget',
        label: 'Reallocate Internal Budget',
        description: 'Pause non-critical programs to fund critical offers.',
        effects: [
          { kind: 'resource', description: 'Cut culture and tooling budgets.', delta: { budget: 160_000 } },
          { kind: 'resource', description: 'Morale takes a hit losing perks.', delta: { morale: -3 } }
        ],
        outcomes: [
          {
            id: 'reallocate-success',
            label: 'Reallocation succeeds',
            description: 'Critical hires land and CFO respects the discipline.',
            weight: 55,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Open roles for key squads shrink.', delta: { openRoles: -2 } },
              { kind: 'modifier', description: 'Reputation rises for fiscal savvy.', delta: { reputation: 2 } }
            ]
          },
          {
            id: 'reallocate-blowback',
            label: 'Reallocation triggers blowback',
            description: 'Teams miss the cut programs and escalate.',
            weight: 45,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Morale falls further.', delta: { morale: -4 } },
              { kind: 'resource', description: 'Velocity slips from disgruntled teams.', delta: { velocity: -3 } }
            ]
          }
        ]
      },
      {
        id: 'pause-offers',
        label: 'Pause Offers and Wait',
        description: 'Freeze everything until finance relents.',
        effects: [],
        outcomes: [
          {
            id: 'pause-brief',
            label: 'Pause is brief',
            description: 'CFO lifts the freeze after a short audit.',
            weight: 40,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Pipeline bounce-back modest.', delta: { pipeline: 2 } },
              { kind: 'resource', description: 'Morale bruised but recovers.', delta: { morale: -1 } }
            ]
          },
          {
            id: 'pause-drags',
            label: 'Pause drags on',
            description: 'Candidates bail and backlog detonates.',
            weight: 60,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Open roles balloon.', delta: { openRoles: 3 } },
              { kind: 'resource', description: 'Pipeline craters.', delta: { pipeline: -6 } }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'manager-promotion',
    name: 'High Performer Demands Promotion',
    summary: 'Your star recruiter wants a promotion or threatens to shop offers.',
    weight: 5,
    options: [
      {
        id: 'promote-now',
        label: 'Promote Immediately',
        description: 'Create a specialist manager role and give them scope.',
        effects: [
          { kind: 'resource', description: 'Comp increase and new headcount coverage.', delta: { budget: -90_000 } }
        ],
        outcomes: [
          {
            id: 'promotion-thrives',
            label: 'Promotion thrives',
            description: 'They mentor others and throughput jumps.',
            weight: 60,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Pipeline efficiency climbs.', delta: { pipeline: 4 } },
              { kind: 'resource', description: 'Morale spikes seeing growth.', delta: { morale: 4 } }
            ]
          },
          {
            id: 'promotion-burdens',
            label: 'Promotion burdens team',
            description: 'New manager role saps cycles and confuses reporting.',
            weight: 40,
            tone: 'failure',
            effects: [
              { kind: 'modifier', description: 'Process debt rises with new layers.', delta: { processDebt: 2 } },
              { kind: 'resource', description: 'Velocity slows amid reorg.', delta: { velocity: -2 } }
            ]
          }
        ]
      },
      {
        id: 'delay-promotion',
        label: 'Delay with Stretch Project',
        description: 'Offer a high-visibility program instead of title change.',
        effects: [],
        outcomes: [
          {
            id: 'stretch-satisfies',
            label: 'Stretch satisfies ambition',
            description: 'They stay engaged and deliver a killer project.',
            weight: 50,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Pipeline benefits from innovation.', delta: { pipeline: 3 } },
              { kind: 'resource', description: 'Morale stays steady.', delta: { morale: 1 } }
            ]
          },
          {
            id: 'stretch-fails',
            label: 'Stretch fails to appease',
            description: 'They exit loudly and take context with them.',
            weight: 50,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Pipeline falters from loss.', delta: { pipeline: -4 } },
              { kind: 'resource', description: 'Open roles increase as you backfill.', delta: { openRoles: 1 } }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'policy-whiplash',
    name: 'HR Policy Whiplash',
    summary: 'People Ops rolls out a surprise hybrid policy without giving hiring managers a playbook.',
    weight: 4,
    options: [
      {
        id: 'train-managers',
        label: 'Rapid Manager Training',
        description: 'Host coaching workshops and publish candidate messaging.',
        effects: [
          { kind: 'resource', description: 'Training pull managers off projects.', delta: { velocity: -2 } }
        ],
        outcomes: [
          {
            id: 'training-lands',
            label: 'Training lands well',
            description: 'Managers align fast and candidate confusion fades.',
            weight: 55,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Pipeline stabilizes.', delta: { pipeline: 3 } },
              { kind: 'resource', description: 'Morale lifts from clarity.', delta: { morale: 2 } }
            ]
          },
          {
            id: 'training-overload',
            label: 'Training overloads teams',
            description: 'Managers grumble and skip the sessions.',
            weight: 45,
            tone: 'failure',
            effects: [
              { kind: 'modifier', description: 'Process debt rises from inconsistent messaging.', delta: { processDebt: 2 } },
              { kind: 'resource', description: 'Pipeline lag persists.', delta: { pipeline: -2 } }
            ]
          }
        ]
      },
      {
        id: 'roll-back',
        label: 'Roll Back and Reboot Later',
        description: 'Pause the policy and promise a considered relaunch.',
        effects: [],
        outcomes: [
          {
            id: 'rollback-calms',
            label: 'Rollback calms nerves',
            description: 'Teams appreciate the reset and alignment time.',
            weight: 50,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Morale steadies with predictability.', delta: { morale: 3 } },
              { kind: 'resource', description: 'Velocity remains steady.', delta: { velocity: 1 } }
            ]
          },
          {
            id: 'rollback-confuses',
            label: 'Rollback confuses candidates',
            description: 'Candidates question stability and drift away.',
            weight: 50,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Pipeline shrinks.', delta: { pipeline: -3 } },
              { kind: 'modifier', description: 'Reputation dips from indecision.', delta: { reputation: -2 } }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'calendar-snafu',
    name: 'Calendar Chaos',
    summary: 'Corporate calendar sync fails, dropping interview invites system-wide.',
    weight: 4,
    options: [
      {
        id: 'backup-tool',
        label: 'Switch to Backup Tool',
        description: 'Adopt a lightweight scheduling tool for the week.',
        effects: [
          { kind: 'resource', description: 'Licenses and setup time.', delta: { budget: -60_000 } }
        ],
        outcomes: [
          {
            id: 'backup-smooth',
            label: 'Backup runs smooth',
            description: 'Candidates barely notice the change.',
            weight: 55,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Pipeline impact minimal.', delta: { pipeline: -1 } },
              { kind: 'resource', description: 'Morale appreciates the save.', delta: { morale: 2 } }
            ]
          },
          {
            id: 'backup-buggy',
            label: 'Backup proves buggy',
            description: 'The interim tool causes more confusion.',
            weight: 45,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Time-to-fill stretches.', delta: { timeToFill: 4 } },
              { kind: 'resource', description: 'Pipeline loses a few candidates.', delta: { pipeline: -3 } }
            ]
          }
        ]
      },
      {
        id: 'manual-confirm',
        label: 'Manual Confirmations',
        description: 'Recruiters personally confirm each loop until systems return.',
        effects: [
          { kind: 'resource', description: 'Recruiting team bandwidth shrinks.', delta: { pipeline: -2 } }
        ],
        outcomes: [
          {
            id: 'manual-charm',
            label: 'Manual touch charms candidates',
            description: 'White glove treatment earns goodwill.',
            weight: 50,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Morale rises from heroic effort.', delta: { morale: 3 } },
              { kind: 'modifier', description: 'Reputation improves with candidates.', delta: { reputation: 2 } }
            ]
          },
          {
            id: 'manual-overload',
            label: 'Manual overload burns team',
            description: 'Fatigue sets in and mistakes multiply.',
            weight: 50,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Morale slumps from exhaustion.', delta: { morale: -4 } },
              { kind: 'resource', description: 'Velocity dips as leaders pitch in.', delta: { velocity: -2 } }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'compliance-audit',
    name: 'Compliance Audit Flare-Up',
    summary:
      'SOX auditors just found onboarding docs written in hieroglyphics; leadership wants receipts by Friday.',
    weight: 3,
    minTurn: 6,
    options: [
      {
        id: 'scramble',
        label: 'Weekend Scramble with Ops Team',
        description: 'Pull ops into a weekend war room and clean the mess yourself.',
        effects: [
          { kind: 'resource', description: 'Delivery pauses for firefighting.', delta: { velocity: -4 } },
          { kind: 'resource', description: 'Talent funnel cools while ops firefights.', delta: { pipeline: -3 } }
        ],
        outcomes: [
          {
            id: 'cleanup-holds',
            label: 'Cleanup holds up to audit',
            description: 'Auditors sign off after the scramble.',
            weight: 65,
            tone: 'success',
            effects: [
              { kind: 'modifier', description: 'Process debt finally drops.', delta: { processDebt: -4 } },
              { kind: 'resource', description: 'Team appreciates the hustle.', delta: { morale: 1 } }
            ]
          },
          {
            id: 'audit-escalates',
            label: 'Findings escalate anyway',
            description: 'Despite the scramble, auditors escalate to leadership.',
            weight: 35,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Morale takes the hit.', delta: { morale: -4 } },
              { kind: 'modifier', description: 'Reputation gets dinged.', delta: { reputation: -2 } }
            ]
          }
        ]
      },
      {
        id: 'consultant',
        label: 'Bring in Compliance Consultant',
        description: 'Hire the pricey consultants with alarming starch in their suits.',
        effects: [
          { kind: 'resource', description: 'Consultant fee lands with a thud.', delta: { budget: -280_000 } }
        ],
        outcomes: [
          {
            id: 'experts-deliver',
            label: 'Experts drop a tidy playbook',
            description: 'Consultants actually ship something useful.',
            weight: 70,
            tone: 'success',
            effects: [
              { kind: 'modifier', description: 'Process debt nosedives.', delta: { processDebt: -6 } },
              { kind: 'resource', description: 'Team breathes easier.', delta: { morale: 1 } }
            ]
          },
          {
            id: 'experts-churn',
            label: 'Consultants churn billable hours',
            description: 'Lots of decks, little impact.',
            weight: 30,
            tone: 'failure',
            effects: [
              { kind: 'modifier', description: 'Debt barely moves.', delta: { processDebt: -2 } },
              { kind: 'resource', description: 'Finance spots surprise overages.', delta: { budget: -80_000 } }
            ]
          }
        ]
      },
      {
        id: 'defer',
        label: 'Push Back on Audit Timeline',
        description: 'Negotiate an extension and hope your rep carries it.',
        effects: [],
        outcomes: [
          {
            id: 'extension-granted',
            label: 'Extension granted',
            description: 'Auditors buy the new timeline.',
            weight: 55,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Roadmap focus restored.', delta: { velocity: 3 } },
              { kind: 'modifier', description: 'Steady-hand reputation grows.', delta: { reputation: 3 } }
            ]
          },
          {
            id: 'extension-denied',
            label: 'Extension denied',
            description: 'Auditors double down on the deadline.',
            weight: 45,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Team morale tanks.', delta: { morale: -5 } },
              { kind: 'resource', description: 'Velocity slips under pressure.', delta: { velocity: -4 } }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'founder-ask',
    name: 'Founder Adds Surprise Headcount',
    summary: 'Founder just Slack’d you five surprise GTM reqs, somehow with negative budget.',
    weight: 5,
    minTurn: 2,
    maxTurn: 18,
    options: [
      {
        id: 'accept',
        label: 'Take on the New Roles',
        description: 'Smile, nod, and stack the reqs—future you can figure out comp bands.',
        effects: [
          { kind: 'resource', description: 'Open roles spike overnight.', delta: { openRoles: 5 } }
        ],
        outcomes: [
          {
            id: 'team-hums',
            label: 'New pod actually hums',
            description: 'The surprise pod finds traction quickly.',
            weight: 45,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Morale gets a small lift.', delta: { morale: 1 } },
              { kind: 'resource', description: 'Velocity gets a nudge.', delta: { velocity: 2 } },
              { kind: 'modifier', description: 'Leadership trust climbs.', delta: { reputation: 2 } }
            ]
          },
          {
            id: 'scope-creeps',
            label: 'Scope creep takes over',
            description: 'Extra pod adds more management overhead than output.',
            weight: 55,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Morale frays.', delta: { morale: -4 } },
              { kind: 'resource', description: 'Delivery slips under the new load.', delta: { velocity: -3 } },
              { kind: 'modifier', description: 'Process debt piles up.', delta: { processDebt: 2 } }
            ]
          }
        ]
      },
      {
        id: 'negotiate',
        label: 'Negotiate for Budget Offset',
        description: 'Trade for marketing budget to fund the hires.',
        effects: [
          { kind: 'resource', description: 'Partial budget relief secured.', delta: { budget: 220_000 } },
          { kind: 'resource', description: 'Still inheriting most of the reqs.', delta: { openRoles: 3 } }
        ],
        outcomes: [
          {
            id: 'trade-closed',
            label: 'Trade lands cleanly',
            description: 'Finance buys in and brand picks up the tab.',
            weight: 50,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Pipeline gets a boost.', delta: { pipeline: 6 } },
              { kind: 'modifier', description: 'Leadership respect ticks up.', delta: { reputation: 1 } }
            ]
          },
          {
            id: 'trade-sours',
            label: 'Trade negotiation sours',
            description: 'Leadership grows impatient with the debate.',
            weight: 50,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Morale takes another hit.', delta: { morale: -2 } },
              { kind: 'resource', description: 'Velocity loses time to politicking.', delta: { velocity: -3 } },
              { kind: 'resource', description: 'Finance claws back funding elsewhere.', delta: { budget: -120_000 } }
            ]
          }
        ]
      },
      {
        id: 'decline',
        label: 'Push Back Firmly',
        description: 'Hold the line and defend the plan like a headcount lawyer.',
        effects: [],
        outcomes: [
          {
            id: 'focused-scope',
            label: 'Scope focus holds',
            description: 'Founder backs off and lets the plan ride.',
            weight: 45,
            tone: 'success',
            effects: [
              { kind: 'modifier', description: 'Process debt eases.', delta: { processDebt: -2 } },
              { kind: 'resource', description: 'Team appreciates the shield.', delta: { morale: 1 } }
            ]
          },
          {
            id: 'overruled',
            label: 'Overruled loudly',
            description: 'Leadership reverses the call and morale tanks.',
            weight: 55,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Additional reqs pile on.', delta: { openRoles: 4 } },
              { kind: 'resource', description: 'Team frustration spikes.', delta: { morale: -5 } },
              { kind: 'modifier', description: 'Reputation with leadership slides.', delta: { reputation: -4 } }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'burnout-warning',
    name: 'Burnout Warning Signs',
    summary: 'Pulse survey screams “too many interviews, not enough shipping” across engineering.',
    weight: 6,
    trigger: (state) => state.resources.morale < 55,
    options: [
      {
        id: 'interview-freeze',
        label: 'Enforce Temporary Interview Freeze',
        description: 'Give squads a breather and tell recruiters to babysit candidates.',
        effects: [
          { kind: 'resource', description: 'Pipeline momentum stalls.', delta: { pipeline: -6 } },
          { kind: 'resource', description: 'Average time-to-fill creeps upward.', delta: { timeToFill: 4 } }
        ],
        outcomes: [
          {
            id: 'reset-works',
            label: 'Reset works wonders',
            description: 'Teams reset and come back sharper.',
            weight: 60,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Energy rebounds.', delta: { morale: 8 } },
              { kind: 'resource', description: 'Delivery hardly notices.', delta: { velocity: -1 } }
            ]
          },
          {
            id: 'freeze-backfires',
            label: 'Freeze backfires',
            description: 'Momentum stalls longer than expected.',
            weight: 40,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Morale only recovers a little.', delta: { morale: 2 } },
              { kind: 'resource', description: 'Velocity drifts down.', delta: { velocity: -3 } },
              { kind: 'resource', description: 'Pipeline sinks further.', delta: { pipeline: -2 } }
            ]
          }
        ]
      },
      {
        id: 'bring-contractors',
        label: 'Bring in Recruiting Contractors',
        description: 'Staff up with contractors and hide them from the CFO.',
        effects: [
          { kind: 'resource', description: 'Contractor burn hits budget.', delta: { budget: -200_000 } }
        ],
        outcomes: [
          {
            id: 'contractor-crush',
            label: 'Contractors crush the queue',
            description: 'Help arrives and the backlog shrinks.',
            weight: 55,
            tone: 'success',
            effects: [
              { kind: 'resource', description: 'Open roles close faster.', delta: { openRoles: -2 } },
              { kind: 'resource', description: 'Interview load lightens.', delta: { timeToFill: -3 } },
              { kind: 'resource', description: 'Teams feel supported.', delta: { morale: 5 } }
            ]
          },
          {
            id: 'contractor-fizzle',
            label: 'Contractors fizzle out',
            description: 'Great slideshow, minimal impact.',
            weight: 45,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Morale dips further.', delta: { morale: -3 } },
              { kind: 'resource', description: 'Funnel still suffers.', delta: { pipeline: -4 } }
            ]
          }
        ]
      },
      {
        id: 'do-nothing',
        label: 'Stay the Course',
        description: 'Grab popcorn and hope the team keeps grinding.',
        effects: [],
        outcomes: [
          {
            id: 'teams-push-through',
            label: 'Teams push through',
            description: 'The grind continues with manageable fallout.',
            weight: 30,
            tone: 'neutral',
            effects: [
              { kind: 'resource', description: 'Morale chips away.', delta: { morale: -2 } },
              { kind: 'resource', description: 'Velocity nudges down.', delta: { velocity: -1 } }
            ]
          },
          {
            id: 'attrition-wave',
            label: 'Attrition wave hits',
            description: 'Burnout triggers regrettable attrition.',
            weight: 70,
            tone: 'failure',
            effects: [
              { kind: 'resource', description: 'Morale tanks hard.', delta: { morale: -6 } },
              { kind: 'modifier', description: 'Process debt balloons as coverage slips.', delta: { processDebt: 3 } }
            ]
          }
        ]
      }
    ]
  }
];
