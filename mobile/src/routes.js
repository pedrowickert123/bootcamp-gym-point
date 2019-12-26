import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from './pages/SignIn';

import Dashboard from './pages/Dashboard';
import HelpOrderList from './pages/HelpOrder/List';
import HelpOrderAnswer from './pages/HelpOrder/Answer';
import HelpOrderQuestion from './pages/HelpOrder/Question';

export default (signedId = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            Dashboard,
            HelpOrderList,
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#ee4e62',
              inactiveTintColor: 'rgba(0, 0, 0, 0.4)',
              style: {
                backgroundColor: '#fff',
              },
            },
          }
        ),
        HelpOrder: createSwitchNavigator({
          HelpOrderAnswer,
          HelpOrderQuestion,
        }),
      },
      {
        initialRouteName: signedId ? 'App' : 'Sign',
      }
    )
  );
