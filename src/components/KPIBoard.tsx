import { ResourceKey, ResourceSnapshot } from '../types/game';
import { formatBudgetValue } from '../utils/format';

interface KPIBoardProps {
  resources: ResourceSnapshot;
  previousResources?: ResourceSnapshot;
}

const statDescriptors: Array<{
  key: keyof ResourceSnapshot;
  label: string;
  format?: (value: number) => string;
  palette: { bg: string; border: string; text: string };
}> = [
  {
    key: 'budget',
    label: 'Budget',
    format: (value) => formatBudgetValue(value),
    palette: {
      bg: 'linear-gradient(135deg, rgba(56, 189, 248, 0.25), rgba(56, 189, 248, 0.45))',
      border: 'rgba(56, 189, 248, 0.5)',
      text: '#0f172a'
    }
  },
  {
    key: 'openRoles',
    label: 'Open Roles',
    palette: {
      bg: 'linear-gradient(135deg, rgba(248, 113, 113, 0.22), rgba(249, 115, 22, 0.35))',
      border: 'rgba(248, 150, 112, 0.5)',
      text: '#7c2d12'
    }
  },
  {
    key: 'timeToFill',
    label: 'Time to Fill (days)',
    palette: {
      bg: 'linear-gradient(135deg, rgba(196, 181, 253, 0.25), rgba(129, 140, 248, 0.32))',
      border: 'rgba(165, 180, 252, 0.55)',
      text: '#3730a3'
    }
  },
  {
    key: 'pipeline',
    label: 'Pipeline',
    format: (value) => `${value}`,
    palette: {
      bg: 'linear-gradient(135deg, rgba(16, 185, 129, 0.18), rgba(34, 197, 94, 0.32))',
      border: 'rgba(52, 211, 153, 0.45)',
      text: '#064e3b'
    }
  },
  {
    key: 'morale',
    label: 'Morale',
    palette: {
      bg: 'linear-gradient(135deg, rgba(251, 191, 36, 0.28), rgba(250, 204, 21, 0.36))',
      border: 'rgba(250, 204, 21, 0.5)',
      text: '#78350f'
    }
  },
  {
    key: 'velocity',
    label: 'Velocity',
    palette: {
      bg: 'linear-gradient(135deg, rgba(96, 165, 250, 0.25), rgba(59, 130, 246, 0.4))',
      border: 'rgba(96, 165, 250, 0.55)',
      text: '#1d4ed8'
    }
  }
];

const formatDelta = (key: keyof ResourceSnapshot, delta: number) => {
  if (key === 'budget') {
    if (delta === 0) return '+$0';
    const formatted = formatBudgetValue(Math.abs(delta)).replace('$', '');
    return `${delta > 0 ? '+' : '-'}$${formatted}`;
  }
  if (key === 'timeToFill') {
    return `${delta > 0 ? '+' : delta < 0 ? '-' : '+'}${Math.round(Math.abs(delta))}d`;
  }
  return `${delta > 0 ? '+' : delta < 0 ? '-' : '+'}${Math.round(Math.abs(delta))}`;
};

const positiveIsGood: Record<ResourceKey, boolean> = {
  budget: true,
  openRoles: false,
  pipeline: true,
  timeToFill: false,
  morale: true,
  velocity: true
};

export const KPIBoard = ({ resources, previousResources }: KPIBoardProps) => {
  const resourceChangeList = (Object.keys(resources) as ResourceKey[]).map((key) => {
    const value = resources[key];
    const previous = previousResources ? previousResources[key] : undefined;
    const delta = previous !== undefined ? value - previous : 0;
    const isPositiveGood = positiveIsGood[key];
    const isImprovement = delta !== 0 && (isPositiveGood ? delta > 0 : delta < 0);
    const isRegression = delta !== 0 && (isPositiveGood ? delta < 0 : delta > 0);
    return {
      key,
      value,
      previous,
      delta,
      isImprovement,
      isRegression
    };
  });

  const changeByKey = new Map(resourceChangeList.map((change) => [change.key, change]));

  return (
    <section className="card subtle-card">
      <h2 style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 700 }}>Org Health Dashboard</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 14
        }}
      >
        {statDescriptors.map((stat) => {
          const rawValue = resources[stat.key];
          const formatted = stat.format ? stat.format(rawValue) : rawValue;
          const change = changeByKey.get(stat.key);
          const delta = change?.delta ?? 0;
          const deltaColor = change?.isImprovement
            ? '#16a34a'
            : change?.isRegression
            ? '#dc2626'
            : 'rgba(51, 65, 85, 0.7)';
          return (
            <div
              key={stat.key}
              style={{
                padding: 16,
                borderRadius: 14,
                background: stat.palette.bg,
                border: `1px solid ${stat.palette.border}`,
                color: stat.palette.text,
                boxShadow: '0 10px 22px rgba(15, 23, 42, 0.08)'
              }}
            >
              <div style={{ fontSize: 12, textTransform: 'uppercase', opacity: 0.75, letterSpacing: 0.8 }}>
                {stat.label}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <div style={{ fontSize: 28, fontWeight: 800 }}>
                  {typeof formatted === 'number' ? Math.round(formatted) : formatted}
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: deltaColor }}>
                  {formatDelta(stat.key, delta)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
