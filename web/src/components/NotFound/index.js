import React from 'react';

import notFoundImg from '../../assets/not-found.png';

import { Container } from './styles';

export default function NotFound() {
  return (
    <Container>
      <img src={notFoundImg} alt="" />
    </Container>
  );
}
