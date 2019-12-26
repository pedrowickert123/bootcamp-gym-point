import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CustomButton = styled(Link)`
  display: flex;
  align-items: center;
  background: ${props => props.color};
  height: 34px;
  border: 0;
  border-radius: 4px;
  font-size: 14px;
  padding: 0px 15px;

  color: #fff;
  text-transform: uppercase;

  span {
    display: flex;
    align-items: center;

    span {
      margin-left: 10px;
    }
  }

  & + button {
    margin-left: 20px;
  }
`;
