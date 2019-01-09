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
    this.props.moveCard(this.props.cards, this.state.toSend);
  };
  removeCard = () => {
    console.log("Remove " + this.state.toSend);
    const toSend = this.props.cards;
    this.props.removeCard(toSend, this.state.toSend);
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
  checkIfEmpty = () => {
    if (this.props.cards.length) {
      return this.props.cards.map((item, key) => (
        <TouchableOpacity
          key={key}
          style={this.props.boardStyle[1]}
          onPress={() => this.openCard(item)}
        >
          <Text style={styles.cardText} onPress={() => this.openCard(item)}>
            {item}
          </Text>
        </TouchableOpacity>
      ));
    } else {
      return <Text style={styles.noTasks}>No tasks yet</Text>;
    }
  };
  checkTitle = () => {
    if (this.props.title === "TO DO") {
      return (
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.2)",
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
            backgroundColor: "whitesmoke",
            borderRadius: 100
          }}
          onPress={this.addCard}
        >
          <Text style={{ fontSize: 30 }}>+</Text>
        </TouchableOpacity>
      );
    } else {
    }
  };

  render() {
    return (
      <ScrollView style={this.props.boardStyle[0]} horizontal={false}>
        <Text style={styles.title}>{this.props.title}</Text>
        {this.checkTitle()}
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
          closeDialog={() => {
            this.showDialog(false);
          }}
        >
          >{" "}
        </DialogInput>
        {this.checkIfEmpty()}
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
  },
  title: {
    padding: 7,
    backgroundColor: "whitesmoke",
    flex: 1,
    height: 40,
    fontSize: 20,
    textAlign: "center"
  },
  noTasks: {
    color: "darkblue",
    textAlign: "center",
    fontSize: 20
  },
  cardText: {
    fontSize: 30,
    textAlign: "center"
  }
};
module.exports = BoardView;
