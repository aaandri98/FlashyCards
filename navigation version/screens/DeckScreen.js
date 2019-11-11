import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';

import Deck from '../assets/Deck.js';

export default class DeckScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      headerTitle: navigation.getParam('name'),
      headerRight: () => (
        <Button
          title="Delete Deck"
          onPress={() => {
            screenProps.deleteDeck(navigation.state.params.deck);
            navigation.navigate('DeckChoice');
          }}
        />
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      deck: this.props.navigation.state.params.deck,
      cards: this.props.navigation.state.params.deck.cards,
    };
    // this.refresh.bind(this);
  }
  /*
  componentDidUpdate(prevProps) {
    prevProps.isFocused !== this.props.isFocused
      ? (this.setState = () => ({
          cards: this.props.navigation.state.params.deck.cards,
          deck: this.props.navigation.state.params.deck,
        }))
      : null;
  }
*/

  refresh = () => {
    this.setState(
      {
        cards: this.props.navigation.state.params.deck.cards,
      },
      console.log(this.props.navigation.state.params.deck.cards)
      //     console.log(this.state.cards)
    );
  };

  handleDelete = id => {
    this.props.screenProps.deleteCard(
      this.props.navigation.state.params.deck,
      id
    );
    this.setState(
      {
        cards: this.props.navigation.state.params.deck.cards,
      },
      console.log(this.props.navigation.state.params.deck.cards)
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          color="#008000"
          title="Add a new Card"
          onPress={() => {
            this.props.navigation.navigate('AddCard', {
              deckName: this.props.navigation.state.params.deck,
              onGoBack: this.refresh,
            });
          }}
        />
        <Deck
          cards={this.state.cards}
          deleteFromNavigator={this.handleDelete}
          addFromNavigator={this.handleAddCard}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
