import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Image } from 'react-native';

import { signIn } from '../../store/modules/auth/actions';

import logo from '../../assets/logo.png';

import { Background, Container, Form, FormInput, SubmitButton } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();

  const [id, setId] = useState('');

  function handleSubmit() {
    dispatch(signIn(id));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Informe seu ID de cadastro"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={id}
            onChangeText={setId}
          />

          <SubmitButton onPress={handleSubmit}>Acessar</SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}
