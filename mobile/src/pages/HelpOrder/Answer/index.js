import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Layout from '../../_layout/pages';

import {
  Container,
  QuestionHeader,
  AnswerHeader,
  Title,
  Time,
  Content,
} from './styles';

export default function HelpOrderAnswer({ navigation }) {
  const helpOrder = navigation.getParam('helpOrder');

  return (
    <Layout backIcon>
      <Container>
        <QuestionHeader>
          <Title>PERGUNTA</Title>
          <Time>{helpOrder.dateFormatted}</Time>
        </QuestionHeader>
        <Content>{helpOrder.question}</Content>

        <AnswerHeader>
          <Title>{helpOrder.answer_at ? 'RESPOSTA' : 'SEM RESPOSTA'}</Title>
        </AnswerHeader>
        <Content>{helpOrder.answer}</Content>
      </Container>
    </Layout>
  );
}

HelpOrderAnswer.navigationOptions = {
  tabBarLabel: 'Check-in',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="help" size={20} color={tintColor} />
  ),
};
