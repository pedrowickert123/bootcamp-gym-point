import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 44px;
    margin: 30px 0 20px;

    strong {
      color: #444;
      font-size: 24px;
    }

    div {
      display: flex;

      button {
        display: flex;
        align-items: center;
        border: 0;
        padding: 10px 20px;
        background: #ee4d64;
        border-radius: 4px;

        span {
          font-weight: bold;
          color: #fff;
          margin-left: 20px;
        }

        &:first-child {
          background: #dddddd;
        }

        & + button {
          margin-left: 15px;
        }
      }

      div {
        display: flex;
        align-items: center;
        width: 250px;
        padding: 10px;
        background: #fff;
        border: 1px solid #eee;
        margin-left: 20px;
        border-radius: 4px;

        input {
          margin-left: 10px;
          width: 100%;
          border: 0;
          background: none;
          color: #666;

          &::placeholder {
            color: #999;
          }
        }
      }
    }
  }
`;

export const Content = styled.div`
  max-width: 100%;
  padding: 30px;
  background: #fff;
  border-radius: 4px;
`;

export const FormGroup = styled.div`
  display: flex;

  & + div {
    margin-top: 30px;
  }

  div {
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
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin-top: 10px;
      font-weight: bold;
    }
  }
`;
