import React from 'react';
import { Button, TouchableOpacity, StyleSheet, View, Text } from 'react-native';

import CardFlip from 'react-native-card-flip';
import Constants from 'expo-constants';

import Deck from './Deck.js';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      front: props.front,
      back: props.back,
      isFlipped: false,
      cardID: props.cardPosition,
    };

    this.mountTime = new Date().getTime();
    this.time = 0;

    this.shiftRight.bind(this);
    this.shiftWrong.bind(this);
    this.timeStop.bind(this);
  }

  componentWillUpdate(newProps, prevProps) {
    if (prevProps.front !== newProps.front) {
      this.addProps();
    }
  }

  componentDidUpdate() {
    this.mountTime = new Date().getTime();
  }

  addProps = () => {
    this.setState({
      front: this.props.front,
      cardID: this.props.cardPosition,
      isFlipped: false,
      mountTime: new Date().getTime(),
    });
  };

  timeStop() {
    this.time = new Date().getTime() - this.mountTime;
  }

  shiftRight = () => {
    this.props.isRight(this.state.cardID, this.time);
    this.props.increaseCounter();
    this.card.flip();
  };

  shiftWrong = () => {
    this.props.isWrong(this.state.cardID, this.time);
    this.props.increaseCounter();
    this.card.flip();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonsView}>
          <Button
            color="#008000"
            title="Restart"
            onPress={() => {
              this.props.restart(this.state.cardID);
              {
                this.state.isFlipped && this.card.flip();
              }
            }}
          />
          <Button
            color="#008000"
            title="Delete"
            onPress={() => {
              this.props.delete(this.state.cardID);
              {
                this.state.isFlipped && this.card.flip();
              }
            }}
          />
        </View>
        <CardFlip style={styles.cardContainer} ref={card => (this.card = card)}>
          <TouchableOpacity
            style={[styles.card, styles.card1]}
            onPress={() => {
              this.card.flip();
              this.timeStop();
              this.setState({ isFlipped: true, back: this.props.back });
            }}>
            <View style={styles.label}>
              <Text style={styles.text}>{this.state.front}</Text>
            </View>
          </TouchableOpacity>

          <View style={[styles.card, styles.card2]}>
            <View style={styles.label}>
              <Text style={styles.text}>{this.state.back}</Text>
            </View>
          </View>
        </CardFlip>

        <View style={styles.buttonsView}>
          <Button
            disabled={!this.state.isFlipped}
            color="#008000"
            title="Right"
            onPress={() => {
              this.shiftRight();
            }}
          />
          <Button
            disabled={!this.state.isFlipped}
            color="#FF0000"
            title="Wrong"
            onPress={() => {
              this.shiftWrong();
            }}
          />
        </View>
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
  cardContainer: {
    width: 300,
    height: 400,
    padding: 50,
  },
  card: {
    width: 300,
    height: 400,
    justifyContent: 'center',
    backgroundColor: '#FE474C',
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  card1: {
    backgroundColor: '#FE474C',
  },
  card2: {
    backgroundColor: '#FEB12C',
  },
  label: {
    width: 300,
    height: 400,
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: '#ffffff',
    padding: 5,
    backgroundColor: 'transparent',
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
