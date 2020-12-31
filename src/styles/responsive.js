export const xs = 'xs';
export const sm = 'sm';
export const md = 'md';
export const lg = 'lg';
export const xl = 'xl';

export const breakpoints = {
  [xs]: 0,
  [sm]: 600,
  [md]: 960,
  [lg]: 1280,
  [xl]: 1920,
};

export function mediaQuery(mq) {
  const [, size] = Object.entries(breakpoints).find(([name]) => mq === name) ?? [];

  return size && `@media (min-width: ${size}px)`;
}
