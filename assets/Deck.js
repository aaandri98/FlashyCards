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
      cards: [...props.cards],
      counter: Deck.count,
      right: [],
      wrong: [],
    };
  }

  componentDidUpdate() {
    if (
      this.state.counter === this.state.cards.length &&
      this.state.cards.length + this.state.counter !== 0
    ) {
      console.log('entrato');
      this.shuffle();
    }
  }

  handleDelete = cardIndex => {
    this.props.onDelete(cardIndex, this.props.deckIndex);
    Deck.count = this.state.counter;
    this.setState(prevState => ({ counter: Deck.count }));
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.counter < this.state.cards.length && (
          <Card
            increaseCounter={this.increaseCounter.bind(this)}
            isRight={this.isRight.bind(this)}
            isWrong={this.isWrong.bind(this)}
            restart={this.restart.bind(this)}
            delete={this.handleDelete}
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

    this.setState(prevState => ({
      counter: Deck.count,
      cards: this.newDeck,
      right: [],
      wrong: [],
    }));
  }

  shuffle() {
    console.log('shuffling');
    Deck.count = 0;
    this.sort();

    let rightToSort = this.state.right.slice();

    this.rightToMerge = rightToSort.sort(this.compareValues).map(a => a.card);

    let wrongToSort = this.state.wrong.slice();

    this.wrongToMerge = wrongToSort.sort(this.compareValues).map(a => a.card);

    let newDeck = [...this.wrongToMerge, ...this.rightToMerge];

    console.log('the right shuffle order is: ');
    console.log(newDeck);
    console.log('the right shuffle order is: ');

    this.setState(newDeck => ({
      counter: Deck.count,
      cards: { newDeck },
      right: [],
      wrong: [],
    }));
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

  compareValues = (a, b) => {
    return b.time - a.time;
  };

  sort() {
    let rightToSort = this.state.right;
    let wrongToSort = this.state.wrong;

    this.setState = prevState => ({
      right: rightToSort,
      wrong: wrongToSort,
    });
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
