import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';

import AddCardForm from '../assets/AddCardForm.js';

export default class AddCardScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Add a new Card',
    };
  };

  handleSubmit = formState => {
    //    console.log(this.props.navigation.state.params.onGoBack);
    this.props.screenProps.addCard(
      this.props.navigation.state.params.deckName,
      formState,
      this.props.navigation.state.params.onGoBack
    );

    //  this.props.navigation.state.getParam('onGoBack');
    this.props.navigation.goBack();
  };

  render() {
    return <AddCardForm onSubmit={this.handleSubmit} />;
  }
}
