import React from 'react';

import Header from '../../../components/Header';

import { Wrapper, Container } from './styles';

export default function Layout({ children, backIcon }) {
  return (
    <Wrapper>
      <Header backIcon={backIcon} />
      <Container>{children}</Container>
    </Wrapper>
  );
}
