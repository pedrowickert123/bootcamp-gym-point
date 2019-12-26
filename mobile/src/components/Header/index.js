import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { signOut } from '../../store/modules/auth/actions';

import logo from '../../assets/logo-extended.png';

import { Container } from './styles';

function Header({ navigation, backIcon }) {
  const dispatch = useDispatch();
  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <Container>
      {backIcon ? (
        <TouchableOpacity onPress={() => navigation.navigate('HelpOrderList')}>
          <Icon name="chevron-left" size={20} color="#ee4e62" />
        </TouchableOpacity>
      ) : (
        <View />
      )}
      <Image source={logo} resizeMode="contain" />
      <TouchableOpacity onPress={handleSignOut}>
        <Icon name="power-settings-new" size={20} color="#ee4e62" />
      </TouchableOpacity>
    </Container>
  );
}

export default withNavigation(Header);
