import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  text-align: center;
  background: #fff;
  padding: 50px 30px;
  border-radius: 4px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    div {
      display: flex;
      flex-direction: column;
      text-align: left;

      label {
        color: #666;
        font-weight: bold;
      }

      input {
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 4px;
        height: 44px;
        padding: 0 15px;
        color: #666;
        margin: 10px 0;

        &::placeholder {
          color: #ddd;
        }
      }

      span {
        color: #fb6f91;
        align-self: flex-start;
        margin: 0 0 10px;
        font-weight: bold;
      }

      & + div {
        margin-top: 5px;
      }
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #ee4d64;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#EE4D64')};
      }
    }
  }
`;
