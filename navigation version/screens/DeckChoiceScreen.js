import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';

export default class DeckChoiceScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Flashy Cards',
      headerRight: () => (
        <Button
          title="Add Deck"
          onPress={() => {
            navigation.navigate('AddDeck');
          }}
        />
      ),
    };
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.screenProps.decks.map(e => (
          <Button
            title={e.name}
            onPress={() => {
              this.props.navigation.navigate('DeckDetail', {
                deck: e,
                name: e.name,
              });
            }}
          />
        ))}
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
