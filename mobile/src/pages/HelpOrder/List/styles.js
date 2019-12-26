import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  margin-top: 10px;
`;

export const HelpOrder = styled(RectButton)`
  margin-top: 10px;
  background: #fff;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Status = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const StatusText = styled.Text`
  font-size: 14px;
  color: ${props => props.color};
  margin-left: 10px;
  font-weight: bold;
`;

export const Time = styled.Text`
  color: #666;
`;

export const Content = styled.Text`
  font-size: 14px;
  color: #666;
  margin-top: 10px;
  line-height: 26px;
`;
