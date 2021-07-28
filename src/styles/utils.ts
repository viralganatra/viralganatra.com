import { PageProps } from 'gatsby';

export function px2rem(px: number): string {
  const unit = px / 16;

  return `${unit}rem`;
}

type Location = Pick<PageProps, 'location'>;

export function isHomePage({ location }: Location): boolean {
  const rootPath = `${__PATH_PREFIX__}/`;

  return location.pathname === rootPath;
}
