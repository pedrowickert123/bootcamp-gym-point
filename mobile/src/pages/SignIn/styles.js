import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Button from '../../components/Button';

export const Background = styled.View`
  flex: 1;
`;

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
`;

export const FormInput = styled.TextInput`
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px 15px;
`;

export const SubmitButton = styled(Button)`
  margin-bottom: 5px;
`;
