import React from 'react';
import styled from '@emotion/styled';

type CalloutProps = {
  children: React.ReactNode;
};

const Aside = styled.aside`
  background-color: var(--color-yellow-100);
  border-left: 5px solid var(--color-orange-800);
  padding: var(--spacing-sm);
`;

export default function Callout({ children }: CalloutProps) {
  return <Aside>{children}</Aside>;
}
