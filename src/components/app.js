import React from 'react';
import PropTypes from 'prop-types';
import globalStyles from '../styles/global';

export default function App({ children }) {
  return (
    <>
      {globalStyles}
      {children}
    </>
  );
}

App.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};
