import styled from 'styled-components/native';

export const Container = styled.View`
  margin-top: 10px;
  background: #fff;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const QuestionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AnswerHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export const Title = styled.Text`
  font-size: 14px;
  color: #444;
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
