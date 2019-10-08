import React, {Component} from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Tela1 from './src/screens/Tela1';
import Tela2 from './src/screens/Tela2';
import Login from './src/screens/Login';
import Camera from './src/screens/Camera';

const AppNavigator = createStackNavigator({ 
  Tela1: {
    screen: Tela1
  },
  Tela2: {
    screen: Tela2
  },
  Login: {
    screen: Login
  },
  Camera: {
    screen: Camera
  }
}, {
  initialRouteName: 'Login'
});

export default createAppContainer(AppNavigator);