import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import globalStyles from '../styles/global';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export default function App({ children }) {
  return (
    <Wrapper>
      {globalStyles}
      {children}
    </Wrapper>
  );
}

App.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};
