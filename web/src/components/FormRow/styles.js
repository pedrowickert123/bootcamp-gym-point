import styled from 'styled-components';

export const Container = styled.div`
  display: flex;

  & + div {
    margin-top: 30px;
  }
`;
