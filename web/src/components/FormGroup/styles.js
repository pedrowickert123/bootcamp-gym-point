import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & + div {
    margin-left: 30px;
  }

  label {
    color: #444;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  input {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 15px 20px;

    &:disabled {
      background: #eee;
    }
  }

  span {
    color: #fb6f91;
    align-self: flex-start;
    margin-top: 10px;
    font-weight: bold;
  }
`;
