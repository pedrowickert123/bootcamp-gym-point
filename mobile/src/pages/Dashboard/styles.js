import styled from 'styled-components/native';

export const CheckInList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 10px;
`;

export const CheckIn = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 4px;
  height: 46px;
  padding: 0 20px;
  margin-top: 10px;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #444;
`;

export const Time = styled.Text`
  font-size: 14px;
  color: #666;
`;
