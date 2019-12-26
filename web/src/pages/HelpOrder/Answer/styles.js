import styled from 'styled-components';

export const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
`;

export const Container = styled.div`
  width: 450px;
  background: #fff;
  border-radius: 4px;
  padding: 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 16px;
    font-weight: bold;
    color: #666;
  }

  svg {
    padding: 5px;
  }

  svg:hover {
    cursor: pointer;
    background: #eee;
    border-radius: 50%;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  font-size: 16px;
  color: #666;

  p {
    margin-top: 10px;
    word-break: break-word;
  }

  > span {
    font-weight: bold;
    margin: 20px 0 10px;
  }

  form {
    textarea {
      width: 100%;
      border: 1px solid #eee;
      border-radius: 4px;
      font-size: 14px;
      color: #666;
      padding: 20px;
    }

    button {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 44px;
      margin-top: 10px;
    }

    > span {
      color: #fb6f91;
      margin-top: 10px;
      font-weight: bold;
    }
  }
`;
