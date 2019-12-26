import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TextInput } from 'react-native';

import api from '../../../services/api';

import Layout from '../../_layout/pages';

import Button from '../../../components/Button';

import { Container } from './styles';

export default function HelpOrderQuestion({ navigation }) {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  const id = useSelector(state => state.auth.id);

  async function handleSubmit() {
    setLoading(true);
    await api.post(`/students/${id}/help-orders`, { question });
    setLoading(false);
    navigation.navigate('HelpOrderList');
  }

  return (
    <Layout backIcon>
      <Container>
        <TextInput
          placeholder="Incua seu pedido de auxílio"
          multiline
          onChangeText={setQuestion}
          value={question}
        />
      </Container>

      <Button onPress={handleSubmit} loading={loading}>
        Novo pedido de auxílio
      </Button>
    </Layout>
  );
}
