import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import Layout from '../_layout/pages';
import Button from '../../components/Button';

import { CheckInList, CheckIn, Title, Time } from './styles';

export default function Dashboard() {
  const [checkins, setCheckins] = useState();

  const id = useSelector(state => state.auth.id);

  async function loadCheckins() {
    const response = await api.get(`/students/${id}/checkins`);

    response.data = response.data.map(checkin => ({
      ...checkin,
      dateFormatted: formatDistance(parseISO(checkin.createdAt), new Date(), {
        locale: pt,
      }),
    }));

    setCheckins(response.data);
  }

  useEffect(() => {
    loadCheckins();
  }, []); //eslint-disable-line

  async function handleCheckIn() {
    await api.post(`/students/${id}/checkins`);

    loadCheckins();
  }

  return (
    <Layout backIcon={false}>
      <Button onPress={handleCheckIn}>Novo check-in</Button>

      <CheckInList
        data={checkins}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <CheckIn>
            <Title>Check-in #{item.id}</Title>
            <Time>{item.dateFormatted}</Time>
          </CheckIn>
        )}
      />
    </Layout>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Check-in',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="room" size={20} color={tintColor} />
  ),
};
