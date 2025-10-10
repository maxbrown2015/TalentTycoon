export const createSeededRng = (seed: number) => {
  let value = seed;
  return () => {
    value += 0x6d2b79f5;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

export const pickWeighted = <T extends { weight: number }>(
  items: T[],
  rng: () => number
): T | undefined => {
  if (!items.length) {
    return undefined;
  }

  const totalWeight = items.reduce((acc, item) => acc + item.weight, 0);
  const roll = rng() * totalWeight;
  let accumulator = 0;

  for (const item of items) {
    accumulator += item.weight;
    if (roll <= accumulator) {
      return item;
    }
  }

  return items[items.length - 1];
};
