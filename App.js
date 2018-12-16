import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Button
} from "react-native";
import StatusBarBackground from "./StatusBarBackground";
import BoardView from "./BoardView.js";
import DialogInput from "react-native-dialog-input";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
//Tutki panresponder
export default class App extends React.Component {
  state = {
    backlogCards: ["Testilappu"],
    inProgressCards: ["Vaiheessa"],
    doneCards: ["Valmis!"],
    isDialogVisible: false
  };

  addCard = () => {
    this.setState({ isDialogVisible: true });
  };
  sendInput = inputText => {
    temp = this.state.backlogCards;
    temp.push(inputText);
    this.setState({ backlogCards: temp, isDialogVisible: false });
  };
  showDialog = show => {
    this.setState({ isDialogVisible: show });
  };
  render() {
    return (
      <View>
        <StatusBarBackground />
        <ScrollView
          ref={scrollView => {
            this.scrollView = scrollView;
          }}
          style={styles.container}
          //pagingEnabled={true}
          horizontal={true}
          decelerationRate={0}
          snapToInterval={width / 1.45}
          snapToAlignment={"center"}
          contentInset={{
            top: 0,
            left: 30,
            bottom: 0,
            right: 30
          }}
        >
          <BoardView
            boardStyle={[styles.backlog, styles.card]}
            cards={this.state.backlogCards}
            addCard={this.addCard}
            isDialogVisible={this.state.isDialogVisible}
            showDialog={this.showDialog}
            sendInput={this.sendInput}
          />
          <BoardView
            boardStyle={[styles.inProgress, styles.card]}
            cards={this.state.inProgressCards}
            addCard={this.addCard}
            isDialogVisible={this.state.isDialogVisible}
            showDialog={this.showDialog}
            sendInput={this.sendInput}
          />
          <BoardView
            boardStyle={[styles.done, styles.card]}
            cards={this.state.doneCards}
            addCard={this.addCard}
            isDialogVisible={this.state.isDialogVisible}
            showDialog={this.showDialog}
            sendInput={this.sendInput}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  container: {},
  backlog: {
    backgroundColor: "lightskyblue",
    width: width - 80,
    height: height,
    borderRadius: 10,
    alignContent: "center"
    //paddingHorizontal : 30
  },
  inProgress: {
    backgroundColor: "crimson",
    width: width - 80,
    height: height,
    borderRadius: 10,
    alignContent: "center"
    //paddingHorizontal : 30
  },
  done: {
    backgroundColor: "limegreen",
    width: width - 80,
    height: height,
    borderRadius: 10,
    alignContent: "center"
    //paddingHorizontal : 30
  },
  card: {
    margin: 10,
    backgroundColor: "lightgrey",
    width: width - 100,
    height: 100,
    alignContent: "center"
  }
};
