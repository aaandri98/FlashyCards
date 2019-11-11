import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {
  createStackNavigator,
  createAppContainer,
} from 'react-navigation-stack';
import Constants from 'expo-constants';
//import Card from './Card.js'

import AppNavigator from './screens/AppNavigator';

import decks from './flashcards.js';
// or any pure javascript modules available in npm

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: decks,
    };
  }

  addDeck = name => {
    console.log('ehi '+ this.state.decks[0])
    console.log(this.state.decks[3])
    this.setState(prevState => ({
      decks: [...prevState.decks, { name, cards: [] }],
    }));
  };

  deleteDeck = badDeck => {
    this.setState(prevState => ({
      decks: prevState.decks.filter(e => {
        return e !== badDeck;
      }),
    }));
  };

  addCard = (deck, newCard, refresh) => {
    // console.log(deck);
    //console.log(newCard);

    let deckIndex = this.state.decks
      .map(function(e) {
        return e.name;
      })
      .indexOf(deck.name);

    let newDeck = {
      name: deck.name,
      cards: [...this.state.decks[deckIndex].cards, newCard],
    };

    let newArray = this.state.decks;
    // console.log(...newArray);

    let remainder = newArray.splice(deckIndex, 1, newDeck);

    //console.log(newArray);
    //    console.log(newArray);

    //console.log('andrea')

    this.setState = () => (
      {
        decks: [...newArray],
      },
      console.log(this.state.decks[deckIndex])
    );
    //refresh();
    //console.log(newArray)
  };

  deleteCard = (deck, card) => {
    let deckIndex = this.state.decks
      .map(function(e) {
        return e.name;
      })
      .indexOf(deck.name);

    let oldDecks = this.state.decks;

    let newDeck = this.state.decks[deckIndex].cards;

    //console.log(this.state.decks[deckIndex].cards[card]);
    let remainder = newDeck.splice(card, 1);
    {
      //console.log(newDeck);
    }
    let newArray = oldDecks.splice(deckIndex, 1, {
      name: deck.name,
      cards: newDeck,
    });

    //*console.log(newArray);

    this.setState = () => ({
      decks: [...newArray],
    });
  };

  /*
  deleteCard(id) {
    if (id === 0) {
      this.setState(prevState => ({
        cards: prevState.cards.slice(1, prevState.cards.length),
      }));
    } else if (id === this.state.cards.length) {
      this.setState(prevState => ({
        cards: prevState.cards.slice(0, prevState.cards.length - 1),
      }));
    } else {
      this.setState(prevState => ({
        cards: [
          ...prevState.cards.slice(0, id),
          ...prevState.cards.slice(id + 1, prevState.cards.length),
        ],
      }));
    }
  }*/
  render() {
    {
      //   console.log(this.state.decks[3]);
    }
    return (
      <AppNavigator
        screenProps={{
          decks: this.state.decks,
          addDeck: this.addDeck,
          deleteDeck: this.deleteDeck,
          addCard: this.addCard,
          deleteCard: this.deleteCard,
        }}
      />
    );
  }
}
