import React from 'react';
import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

export default class AddCardForm extends React.Component {
  state = {
    front: '',
    back: '',
    isFormValid: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.front !== prevState.front ||
      this.state.back !== prevState.back
    ) {
      this.validateForm();
    }
  }

  getHandler = key => val => {
    this.setState({ [key]: val });
  };

  handleFrontChange = this.getHandler('back');
  handleBackChange = this.getHandler('front');

  validateForm = () => {
    if (this.state.back.length >= 3 && this.state.front.length >= 3) {
      this.setState({ isFormValid: true });
    } else {
      this.setState({ isFormValid: false });
    }
  };

  handleSubmit = () => {
    this.props.onSubmit({ front: this.state.front, back: this.state.back });
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TextInput
          style={styles.input}
          value={this.state.front}
          onChangeText={this.getHandler('front')}
          placeholder="Front of the card"
        />
        <TextInput
          style={styles.input}
          value={this.state.back}
          onChangeText={this.getHandler('back')}
          placeholder="Back of the card"
        />
        <Button
          title="Add"
          onPress={this.handleSubmit}
          disabled={!this.state.isFormValid}
        />
      </KeyboardAvoidingView>
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
  input: {
    borderWidth: 1,
    borderColor: 'black',
    minWidth: 100,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
  },
});
