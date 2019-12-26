import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import logo from '../../assets/logo-small.svg';
import { Container, Content, Profile } from './styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);

  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Logo" />
          <span>GYMPOINT</span>
          <NavLink to="/students" activeStyle={{ color: '#333' }}>
            ALUNOS
          </NavLink>
          <NavLink to="/plans" activeStyle={{ color: '#333' }}>
            PLANOS
          </NavLink>
          <NavLink to="/enrollment" activeStyle={{ color: '#333' }}>
            MATRÍCULAS
          </NavLink>
          <NavLink to="/help_orders" activeStyle={{ color: '#333' }}>
            PEDIDOS DE AUXÍLIO
          </NavLink>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <button type="button" onClick={() => handleSignOut()}>
                sair do sistema
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
