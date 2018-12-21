import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
  TouchableOpacity
} from "react-native";
import DialogInput from "react-native-dialog-input";

class BoardView extends Component {
  state = {
    cards: this.props.cards,
    isDialogVisible: this.props.isDialogVisible,
    toSend: ""
  };
  addCard = () => {
    this.props.addCard();
  };
  submitInput = inputText => {
    this.props.sendInput(inputText);
  };
  showDialog = status => {
    this.props.showDialog(status);
  };
  moveCard = () => {
    this.props.moveCard(this.state.cards, this.state.toSend);
  };
  removeCard = () => {
    console.log("Remove " + this.state.toSend);
    this.props.removeCard(this.state.cards, this.state.toSend);
  };
  openCard = item => {
    this.setState({ toSend: item });
    Alert.alert(
      item,
      "Select action to perform",
      [
        { text: "Delete", onPress: () => this.removeCard() },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Move Up", onPress: () => this.moveCard() }
      ],
      { cancelable: true }
    );
  };
  render() {
    return (
      <ScrollView style={this.props.boardStyle[0]} horizontal={false}>
        <Button title="Add" onPress={() => this.addCard()} />
        <DialogInput
          isDialogVisible={this.props.isDialogVisible}
          title={"Task input"}
          message={"Name task"}
          hintInput={"Enter title for task"}
          submitInput={inputText => {
            this.submitInput(inputText);
          }}
          showDialog={() => {
            this.showDialog(false);
          }}
        >
          {" "}
        </DialogInput>
        {this.state.cards.map((item, key) => (
          <TouchableOpacity key={key} style={this.props.boardStyle[1]}>
            <Text
              style={{ textAlign: "center", height: 100 }}
              onPress={() => this.openCard(item)}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}
const styles = {
  cardButton: {
    margin: 10,
    backgroundColor: "lightgrey",
    width: 100,
    height: 100,
    alignContent: "center"
  }
};
module.exports = BoardView;
