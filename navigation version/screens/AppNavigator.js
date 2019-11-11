import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import DeckScreen from './DeckScreen';
import DeckChoiceScreen from './DeckChoiceScreen';
import AddDeckScreen from './AddDeckScreen';
import AddCardScreen from './AddCardScreen';

const MainStack = createStackNavigator(
  {
    AddDeck: {
      screen: AddDeckScreen,
    },
    AddCard: {
      screen: AddCardScreen,
    },
    DeckDetail: {
      screen: DeckScreen,
    },
    DeckChoice: {
      screen: DeckChoiceScreen,
    },
  },
  {
    initialRouteName: 'DeckChoice',
    navigationOptions: {
      headerTintColor: '#a41034',
      headerStyle: {
        backgroundColor: '#fff',
      },
    },
  }
);

const AppNavigator = createAppContainer(MainStack);

export default AppNavigator;
