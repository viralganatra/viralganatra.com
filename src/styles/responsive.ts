export const xs = 'xs';
export const sm = 'sm';
export const md = 'md';
export const lg = 'lg';
export const xl = 'xl';

type Breakpoint = typeof xs | typeof sm | typeof md | typeof lg | typeof xl;

export const breakpoints: Record<Breakpoint, number> = {
  [xs]: 0,
  [sm]: 600,
  [md]: 960,
  [lg]: 1280,
  [xl]: 1920,
};

export function mediaQuery(mq: keyof typeof breakpoints): string | null {
  const [, size] = Object.entries(breakpoints).find(([name]) => mq === name) ?? [];

  return size ? `@media (min-width: ${size}px)` : null;
}
