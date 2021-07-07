import React from 'react';
import styled from '@emotion/styled';
import globalStyles from '../styles/global';

type AppProps = {
  children: React.ReactNode[];
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export default function App({ children }: AppProps) {
  return (
    <Wrapper>
      {globalStyles}
      {children}
    </Wrapper>
  );
}
