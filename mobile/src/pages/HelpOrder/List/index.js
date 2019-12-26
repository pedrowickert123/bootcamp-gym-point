import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { formatDistance, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../../services/api';

import Layout from '../../_layout/pages';

import Button from '../../../components/Button';

import {
  List,
  HelpOrder,
  Header,
  Status,
  StatusText,
  Time,
  Content,
} from './styles';

export default function HelpOrderList({ navigation }) {
  const [helpOrders, setHelpOrders] = useState([]);

  const id = useSelector(state => state.auth.id);

  async function loadHelpOrders() {
    const response = await api.get(`/students/${id}/help-orders`);
    response.data.data = response.data.data.map(checkin => ({
      ...checkin,
      dateFormatted: formatDistance(parseISO(checkin.createdAt), new Date(), {
        locale: pt,
      }),
    }));

    setHelpOrders(response.data.data);
  }

  useEffect(() => {
    loadHelpOrders();
  }, []); //eslint-disable-line

  return (
    <Layout backIcon={false}>
      <Button onPress={() => navigation.navigate('HelpOrderQuestion')}>
        Novo pedido de auxílio
      </Button>

      <List
        data={helpOrders}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <HelpOrder
            onPress={() =>
              navigation.navigate('HelpOrderAnswer', { helpOrder: item })
            }
          >
            <Header>
              <Status>
                {item.answer_at ? (
                  <>
                    <Icon name="check-circle" size={20} color="#42CB59" />
                    <StatusText color="#42CB59">Respondida</StatusText>
                  </>
                ) : (
                  <>
                    <Icon name="check-circle" size={20} color="#ddd" />
                    <StatusText color="#dddddd">Não respondida</StatusText>
                  </>
                )}
              </Status>
              <Time>{item.dateFormatted}</Time>
            </Header>
            <Content numberOfLines={3}>{item.question}</Content>
          </HelpOrder>
        )}
      />
    </Layout>
  );
}

HelpOrderList.navigationOptions = {
  tabBarLabel: 'Pedir ajuda',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="help" size={20} color={tintColor} />
  ),
};
