import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { px2rem } from '../styles/utils';
import { mediaQuery, lg } from '../styles/responsive';
import { HEADER_SIZE_LARGE, HEADER_SIZE_SMALL } from '../constants/header';

type SizeProps = {
  size?: typeof HEADER_SIZE_LARGE | typeof HEADER_SIZE_SMALL;
};

type HeaderProps = SizeProps & {
  text?: string;
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
    font-size: ${({ size }) => (size === HEADER_SIZE_SMALL ? px2rem(80) : px2rem(100))};
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

const Strapline = styled.p<SizeProps>`
  color: var(--color-text);
  font-size: calc(0.4rem + 1vmin + 0.4rem + 1vmax);
  line-height: 1;
  text-shadow: var(--color-text-invert) 2px 2px 0;
  text-transform: uppercase;
  transform: skewX(-10deg);

  ${mediaQuery(lg)} {
    font-size: ${({ size }) => (size === HEADER_SIZE_SMALL ? px2rem(40) : px2rem(50))};
  }
`;

export default function Header({ size = HEADER_SIZE_SMALL, text = 'Viral Ganatra' }: HeaderProps) {
  return (
    <>
      <Logo data-heading={text} size={size}>
        <LogoLink to="/">{text}</LogoLink>
      </Logo>
      <Strapline size={size}>Pixels with purpose</Strapline>
    </>
  );
}
