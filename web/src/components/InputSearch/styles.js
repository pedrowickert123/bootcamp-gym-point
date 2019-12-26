import styled from 'styled-components';

export const Container = styled.div`
  min-width: 250px;
  display: flex;
  align-items: center;
  border: 1px solid #eee;
  background: #fff;
  margin-left: 20px;
  height: 34px;
  padding: 0 10px;
  border-radius: 4px;

  svg {
    color: #999;
  }
`;

export const Input = styled.input`
  border: 0;
  margin-left: 5px;
  color: #666;

  &::placeholder {
    color: #999;
  }
`;
