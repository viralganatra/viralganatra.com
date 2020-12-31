import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import globalStyles from '../styles/global';
import { px2rem } from '../styles/utils';
import { mediaQuery, sm, lg } from '../styles/responsive';

const Container = styled.div`
  display: grid;
  gap: var(--spacing-content);
  grid-template-columns: repeat(auto-fit, 100%);
  margin: var(--spacing-content);
  place-content: center;

  ${mediaQuery(lg)} {
    grid-template-columns: none;
  }
`;

const Masthead = styled.div`
  text-align: center;
`;

const Logo = styled.div`
  color: var(--text-color-highlight);
  display: inline-flex;
  font-size: calc(1rem + 1vmin + 1rem + 1vmax);
  font-weight: bold;
  letter-spacing: -3px;
  line-height: 1;
  margin: 0;
  position: relative;
  text-shadow: var(--text-color) 3px 2px 0;
  text-transform: uppercase;

  ${mediaQuery(sm)} {
    font-size: calc(1.5rem + 1vmin + 1.5rem + 1vmax);
  }
  ${mediaQuery(lg)} {
    font-size: ${px2rem(120)};
  }
  &:after {
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-image: linear-gradient(
      to left,
      transparent 0%,
      transparent 25%,
      var(--text-color) 25%,
      var(--text-color) 50%,
      transparent 50%,
      transparent 75%,
      var(--text-color) 75%
    );
    background-size: 4px 4px;
    content: attr(data-heading);
    display: block;
    left: 5px;
    position: absolute;
    text-shadow: none;
    top: 6px;
    width: 100%;
    z-index: -1;

    ${mediaQuery(lg)} {
      left: 9px;
      top: 10px;
    }
  }
`;

const Strapline = styled.p`
  color: var(--text-color);
  font-size: calc(0.4rem + 1vmin + 0.4rem + 1vmax);
  line-height: 1;
  text-shadow: var(--text-color-highlight) 2px 2px 0;
  text-transform: uppercase;
  transform: skewX(-10deg);

  ${mediaQuery(lg)} {
    font-size: ${px2rem(60)};
  }
`;

const Main = styled.main`
  background-color: var(--content-bg);
  color: var(--content-text-color);
  max-width: var(--site-max-width);
  padding: var(--spacing-content);
`;

export default function Layout({ children }) {
  return (
    <>
      {globalStyles}

      <Container>
        <Masthead>
          <Logo data-heading="Viral Ganatra">Viral Ganatra</Logo>
          <Strapline>Pixels with purpose</Strapline>
        </Masthead>
        <Main>{children}</Main>
      </Container>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};
