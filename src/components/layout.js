import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import globalStyles from '../styles/global';

const Container = styled.div`
  display: grid;
  gap: 3rem;
  margin: 3rem 0;
  place-content: center;
`;

const Masthead = styled.div`
  text-align: center;
`;

const Logo = styled.div`
  color: var(--text-color-highlight);
  display: inline-flex;
  font-size: 7.5rem;
  font-weight: bold;
  letter-spacing: -3px;
  line-height: 1;
  margin: 0;
  position: relative;
  text-shadow: var(--text-color) 3px 2px 0;
  text-transform: uppercase;

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
    left: 9px;
    position: absolute;
    text-shadow: none;
    top: 10px;
    width: 100%;
    z-index: -1;
  }
`;

const Strapline = styled.p`
  color: var(--text-color);
  font-size: 3.75rem;
  line-height: 1;
  text-shadow: var(--text-color-highlight) 2px 2px 0;
  text-transform: uppercase;
  transform: skewX(-10deg);
`;

const Main = styled.main`
  background-color: var(--content-bg);
  color: var(--content-text-color);
  max-width: var(--site-max-width);
  padding: 3rem;
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
