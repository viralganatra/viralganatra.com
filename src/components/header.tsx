import React from 'react';
import styled from '@emotion/styled';
import { graphql, Link, useStaticQuery, PageProps } from 'gatsby';
import { isHomePage, px2rem } from '../styles/utils';
import { mediaQuery, lg } from '../styles/responsive';

const SIZE_LARGE = 'SIZE_LARGE';
const SIZE_SMALL = 'SIZE_SMALL';

type SizeProps = {
  size?: typeof SIZE_LARGE | typeof SIZE_SMALL;
};

type HeaderProps = Pick<PageProps, 'location'>;

type QueryProps = {
  site: {
    siteMetadata: {
      title: string;
      tagline: string;
    };
  };
};

const Logo = styled.div<SizeProps>`
  color: var(--color-text-invert);
  display: inline-flex;
  font-size: calc(1rem + 1vmin + 1rem + 1vmax);
  font-weight: bold;
  letter-spacing: -3px;
  line-height: 1;
  position: relative;
  text-shadow: var(--color-text) 3px 2px 0;
  text-transform: uppercase;

  ${mediaQuery(lg)} {
    font-size: ${({ size }) => (size === SIZE_SMALL ? px2rem(80) : px2rem(120))};
    margin: calc(var(--spacing-md) * -1) 0 0 0;
  }
  &:after {
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-image: linear-gradient(
      to left,
      transparent 0%,
      transparent 25%,
      var(--color-text) 25%,
      var(--color-text) 50%,
      transparent 50%,
      transparent 75%,
      var(--color-text) 75%
    );
    background-size: 4px 4px;
    content: attr(data-heading);
    display: block;
    left: 5px;
    position: absolute;
    text-shadow: none;
    top: 6px;
    transition: all 300ms ease;
    width: 100%;
    z-index: -1;

    ${mediaQuery(lg)} {
      left: 9px;
      top: 10px;
    }
  }
  ${mediaQuery(lg)} {
    &:hover:after {
      left: 1px;
      top: 1px;
    }
  }
`;

const LogoLink = styled(Link)`
  background: inherit;
  border: none;
  color: inherit;
  padding: 0;

  &:hover {
    background: inherit;
  }
`;

const Info = styled.p<SizeProps>`
  align-self: flex-start;
  background-color: var(--color-text-invert);
  border: solid 1px var(--color-text);
  color: var(--color-text);
  font-size: calc(0.4rem + 1vmin + 0.4rem + 1vmax);
  line-height: 1;
  padding: var(--spacing-xs) var(--spacing-sm);
  text-transform: uppercase;

  ${mediaQuery(lg)} {
    font-size: ${({ size }) => (size === SIZE_SMALL ? px2rem(40) : px2rem(50))};
    margin-bottom: 50px;
  }
`;

const StraplineLight = styled.p<SizeProps>`
  align-self: flex-start;
  background-color: var(--color-text-invert);
  border: solid 1px var(--color-text);
  color: var(--color-text);
  font-size: var(--text-size-beta);
  line-height: var(--text-line-height-beta);
  padding: var(--spacing-xs) var(--spacing-sm);
  transform: skewX(-10deg);

  ${mediaQuery(lg)} {
    margin-top: var(--spacing-xxl);
  }
`;

const StraplineDark = styled.p<SizeProps>`
  color: var(--color-text);
  font-size: calc(0.4rem + 1vmin + 0.4rem + 1vmax);
  line-height: 1;
  text-shadow: var(--color-text-invert) 2px 2px 0;
  text-transform: uppercase;
  transform: skewX(-10deg);

  ${mediaQuery(lg)} {
    font-size: ${({ size }) => (size === SIZE_SMALL ? px2rem(40) : px2rem(50))};
  }
`;

export default function Header({ location }: HeaderProps) {
  const { site } = useStaticQuery<QueryProps>(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
          tagline
        }
      }
    }
  `);

  const isRootPage = isHomePage({ location });
  const headerSize = isRootPage ? SIZE_LARGE : SIZE_SMALL;
  const Strapline = isRootPage ? StraplineLight : StraplineDark;

  return (
    <>
      {isRootPage ? <Info>Hi, I&apos;m</Info> : null}
      <Logo data-heading={site.siteMetadata.title} size={headerSize}>
        <LogoLink to="/">{site.siteMetadata.title}</LogoLink>
      </Logo>
      <Strapline size={headerSize}>{site.siteMetadata.tagline}</Strapline>
    </>
  );
}
