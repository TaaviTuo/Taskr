import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  Button
} from "react-native";
import DialogInput from "react-native-dialog-input";

class BoardView extends Component {
  state = {
    cards: this.props.cards
  };
  render() {
    return (
      <View style={this.props.boardStyle[0]}>
        <Button title="Add" onPress={this.props.addCard} />
        <DialogInput
          isDialogVisible={this.props.isDialogVisible}
          title={"Task input"}
          message={"Name task"}
          hintInput={"Enter title for task"}
          submitInput={inputText => {
            this.props.sendInput(inputText);
          }}
          closeDialog={() => {
            this.props.showDialog(false);
          }}
        />
        {this.state.cards.map((item, key) => (
          <View key={key} style={this.props.boardStyle[1]}>
            <Text style={{ textAlign: "center" }}>{item} </Text>
          </View>
        ))}
      </View>
    );
  }
}

module.exports = BoardView;
