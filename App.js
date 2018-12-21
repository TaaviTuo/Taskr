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
  moveCard = (current, toMove) => {
    if (current === this.state.backlogCards) {
      let tempCurrent = this.state.backlogCards;
      let tempNext = this.state.inProgressCards;
      let index = tempCurrent.indexOf(toMove);
      tempNext.push(current[index]);
      if (index !== -1) {
        tempCurrent.splice(index, 1);
        this.setState({ backlogCards: tempCurrent });
      }
      this.setState({ inProgress: tempNext });
    } else if (current === this.state.inProgressCards) {
      let tempCurrent = this.state.inProgressCards;
      let tempNext = this.state.doneCards;
      let index = tempCurrent.indexOf(toMove);
      tempNext.push(current[index]);
      if (index !== -1) {
        tempCurrent.splice(index, 1);
        this.setState({ inProgressCards: tempCurrent });
      }
      this.setState({ doneCards: tempNext });
    } else {
      let tempCurrent = this.state.doneCards;
      let index = tempCurrent.indexOf(toMove);
      if (index !== -1) {
        tempCurrent.splice(index, 1);
        this.setState({ doneCards: tempCurrent });
      }
    }
  };
  removeCard = (current, toRemove) => {
    console.log("Removing " + toRemove);
    if (current === this.state.backlogCards) {
      let tempCurrent = this.state.backlogCards;
      let index = tempCurrent.indexOf(toRemove);
      if (index !== -1) {
        tempCurrent.splice(index, 1);
        this.setState({ backlogCards: tempCurrent });
      }
    } else if (current === this.state.inProgressCards) {
      let tempCurrent = this.state.inProgressCards;
      let index = tempCurrent.indexOf(toRemove);
      if (index !== -1) {
        tempCurrent.splice(index, 1);
        this.setState({ inProgressCards: tempCurrent });
      }
    } else {
      let tempCurrent = this.state.doneCards;
      let index = tempCurrent.indexOf(toRemove);
      if (index !== -1) {
        tempCurrent.splice(index, 1);
        this.setState({ doneCards: tempCurrent });
      }
    }
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
            moveCard={this.moveCard}
            removeCard={this.removeCard}
          />
          <BoardView
            boardStyle={[styles.inProgress, styles.card]}
            cards={this.state.inProgressCards}
            addCard={this.addCard}
            isDialogVisible={this.state.isDialogVisible}
            showDialog={this.showDialog}
            sendInput={this.sendInput}
            moveCard={this.moveCard}
            removeCard={this.removeCard}
          />
          <BoardView
            boardStyle={[styles.done, styles.card]}
            cards={this.state.doneCards}
            addCard={this.addCard}
            isDialogVisible={this.state.isDialogVisible}
            showDialog={this.showDialog}
            sendInput={this.sendInput}
            moveCard={this.moveCard}
            removeCard={this.removeCard}
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
