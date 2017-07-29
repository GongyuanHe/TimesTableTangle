'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import Button from 'react-native-flat-button';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './components/HomeScreen';
import SettingScreen from './components/SettingScreen';
import GameScreen from './components/GameScreen';

const App = StackNavigator({
     Home: { screen: HomeScreen },
     Setting: {screen: SettingScreen},
     Game:{ screen: GameScreen }
});

export default App;
