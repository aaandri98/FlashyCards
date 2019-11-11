import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';

import Constants from 'expo-constants';
//import Card from './Card.js'

import Deck from './assets/Deck.js';
import AddDeckForm from './assets/AddDeck.js';
import RenameDeckForm from './assets/RenameDeck.js';
import AddCardForm from './assets/AddCard.js';
import decks from './flashcards';
// or any pure javascript modules available in npm
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'Flashy Card',
      decks: decks,
      whatToShow: 'buttons',
      num: '',
      toUpdate: false,
    };
    this.addDeck.bind(this);
    this.deleteDeck.bind(this);
    this.addCard.bind(this);
    this.renameDeck.bind(this);
  }

  addDeck = name => {
    this.setState(
      prevState => ({ decks: [...prevState.decks, { ...name, cards: [] }] }),
      this.setState({ whatToShow: 'buttons' })
    );
  };

  addCard = (deckIndex, newCard) => {
    const newCards = [...this.state.decks[deckIndex].cards, newCard];

    let arrToMod = [...this.state.decks];

    const arr = arrToMod.splice(deckIndex, 1, {
      name: this.state.decks[deckIndex].name,
      cards: newCards,
    });

    this.setState(
      () => ({ decks: arrToMod }),
      this.setState({ whatToShow: 'deck' })
    );
  };

  deleteCard = (cardIndex, deckIndex) => {
    const cardsToMod = [...this.state.decks[deckIndex].cards];
    const newCards = cardsToMod.splice(cardIndex, 1);

    let arrToMod = [...this.state.decks];

    const arr = arrToMod.splice(deckIndex, 1, {
      name: this.state.decks[deckIndex].name,
      cards: cardsToMod,
    });

    this.setState(() => ({ decks: arrToMod }));
  };

  deleteDeck = badDeck => {
    const arrayToMod = this.state.decks.filter(e => {
      return e.name !== badDeck.name;
    });

    this.setState(
      () => ({ decks: arrayToMod }),
      this.setState({ whatToShow: 'buttons' })
    );
  };

  renameDeck = (name, deckIndex) => {
    console.log('called' + name);
    const newCards = [...this.state.decks[deckIndex].cards];

    let arrToMod = [...this.state.decks];
    console.log(name);
    const arr = arrToMod.splice(deckIndex, 1, {
      name: name,
      cards: newCards,
    });

    this.setState(
      () => ({ decks: arrToMod }),
      this.setState({ whatToShow: 'buttons' })
    );
  };

  render() {
    let appSwitch = this.state.whatToShow;

    if (appSwitch === 'buttons') {
      return (
        <View style={styles.container}>
          <Text> {this.state.name}</Text>

          {this.state.decks.map(e => (
            <Button
              title={e.name}
              onPress={() =>
                this.setState(() => ({
                  whatToShow: 'deck',
                  num: this.state.decks.indexOf(e),
                }))
              }
            />
          ))}
          <Button
            title="Add Deck"
            onPress={() =>
              this.setState(() => ({
                whatToShow: 'addDeck',
              }))
            }
          />
        </View>
      );
    } else if (this.state.whatToShow === 'deck') {
      console.log('rendered again');
      return (
        <View style={styles.container}>
          <Button
            title="Back"
            onPress={() =>
              this.setState(() => ({
                whatToShow: 'buttons',
              }))
            }
          />
          <Button
            title="Delete Deck"
            onPress={() => {
              this.deleteDeck(this.state.decks[this.state.num]);
            }}
          />
          <Button
            title="Rename Deck"
            onPress={() => {
              this.setState(() => ({
                whatToShow: 'renameDeck',
              }));
            }}
          />
          <Button
            title="Add card"
            onPress={() => {
              this.setState(() => ({
                whatToShow: 'addCard',
              }));
            }}
          />
          <Deck
            cards={this.state.decks[this.state.num].cards}
            onDelete={this.deleteCard}
            deckIndex={this.state.num}
          />
        </View>
      );
    } else if (this.state.whatToShow === 'addDeck') {
      return <AddDeckForm onSubmit={this.addDeck} />;
    } else if (this.state.whatToShow === 'addCard') {
      return <AddCardForm onSubmit={this.addCard} deckIndex={this.state.num} />;
    } else if (this.state.whatToShow === 'renameDeck') {
      return (
        <RenameDeckForm onSubmit={this.renameDeck} deckIndex={this.state.num} />
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
});
