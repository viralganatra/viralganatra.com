import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import globalStyles from '../styles/global';

const Masthead = styled.div`
  padding-top: 50px;
  text-align: center;
`;

const Logo = styled.div`
  display: inline-flex;
  font-size: 7.5rem;
  letter-spacing: -3px;
  margin: 0;
  position: relative;
  text-transform: uppercase;

  color: #fff;
  font-weight: bold;
  line-height: 1;
  text-shadow: #565454 3px 2px 0;

  &:after {
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-image: linear-gradient(
      to left,
      transparent 0%,
      transparent 25%,
      #555 25%,
      #555 50%,
      transparent 50%,
      transparent 75%,
      #555 75%
    );
    background-size: 4px 4px;
    content: attr(data-heading);
    display: block;
    left: 8px;
    position: absolute;
    text-shadow: none;
    top: 10px;
    width: 100%;
    z-index: -1;
  }
`;

const Strapline = styled.p`
  color: #3a3c3e;
  font-size: 3.75rem;
  line-height: 1;
  margin: 20px;
  text-shadow: #fff 2px 2px 0;
  text-transform: uppercase;
  transform: skewX(-10deg);
`;

const Main = styled.main`
  background-color: rgba(255, 255, 255, 0.9);
  margin: 50px auto;
  max-width: 1200px;
  padding: 50px;
`;

export default function Layout({ children }) {
  return (
    <>
      {globalStyles}
      <Masthead>
        <Logo data-heading="Viral Ganatra">Viral Ganatra</Logo>
        <Strapline>Pixels with purpose</Strapline>
      </Masthead>

      <Main>{children}</Main>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};
