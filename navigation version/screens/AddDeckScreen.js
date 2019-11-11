import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';

import AddDeckForm from '../assets/AddDeckForm.js';

export default class AddDeckScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Add a new Deck',
    };
  };

  handleSubmit = formState => {
    this.props.screenProps.addDeck(formState);
    this.props.navigation.goBack();
    //this.props.navigation.navigate('DeckDetail');
  };

  render() {
    return <AddDeckForm onSubmit={this.handleSubmit} />;
  }
}
