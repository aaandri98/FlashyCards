import React from 'react';
import { Button, TouchableOpacity, StyleSheet, View, Text } from 'react-native';

import Constants from 'expo-constants';

import Card from './Card.js';

export default class Deck extends React.Component {
  static count = 0;

  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      cards: this.cards,
      counter: Deck.count,
      right: [],
      wrong: [],
      //      isDeleted: props.isDeleted,
    };
  }

  cards = this.props.cards.length > 0 ? [...this.props.cards] : [];

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.counter === this.state.cards.length &&
      this.state.cards.length + this.state.counter !== 0
    ) {
      this.shuffle();
    }
  }
 
 
  render() {
    return (
      <View style={styles.container}>
        {this.state.counter < this.state.cards.length && (
          <Card
            increaseCounter={this.increaseCounter.bind(this)}
            isRight={this.isRight.bind(this)}
            isWrong={this.isWrong.bind(this)}
            restart={this.restart.bind(this)}
            delete={this.delete.bind(this)}
            cardPosition={this.state.counter}
            {...this.state.cards.slice(this.state.counter)[0]}
          />
        )}
      </View>
    );
  }

  restart(counter) {
    Deck.count = 0;
    this.sort();

    this.rightToMerge = this.state.right.map(a => a.card);
    this.wrongToMerge = this.state.wrong.map(a => a.card);

    this.newDeck = [
      ...this.wrongToMerge,
      ...this.state.cards.slice(counter),
      ...this.rightToMerge,
    ];

    console.log(this.newDeck);

    this.setState(prevState => ({
      counter: Deck.count,
      cards: this.newDeck,
      right: [],
      wrong: [],
    }));
  }

  shuffle() {
    Deck.count = 0;
    this.sort();

    this.rightToMerge = this.state.right.map(a => a.card);
    this.wrongToMerge = this.state.wrong.map(a => a.card);

    this.newDeck = [...this.wrongToMerge, ...this.rightToMerge];

    this.setState(prevState => ({
      counter: Deck.count,
      cards: this.newDeck,
      right: [],
      wrong: [],
    }));
  }

  delete(id) {
    this.props.deleteFromNavigator(this.state.counter);

    this.setState({ cards: this.props.cards });
    /*if (id === 0) {
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
    }*/
  }

  increaseCounter() {
    Deck.count++;

    this.setState(() => ({
      counter: Deck.count,
    }));
  }

  isRight(id, time) {
    this.setState(prevState => ({
      right: prevState.right.concat({ card: this.state.cards[id], time: time }),
    }));
  }

  isWrong(id, time) {
    this.setState(prevState => ({
      wrong: prevState.wrong.concat({ card: this.state.cards[id], time: time }),
    }));
  }

  sort() {
    this.state.right.sort((a, b) => a.time > b.time);
    this.state.wrong.sort((a, b) => a.time > b.time);
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
