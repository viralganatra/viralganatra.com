export function px2rem(px: number): string {
  const unit = px / 16;

  return `${unit}rem`;
}
