import React, { Component } from "react";
import { View, ScrollView, Dimensions, AsyncStorage } from "react-native";
import StatusBarBackground from "./StatusBarBackground";
import BoardView from "./BoardView.js";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
//Tutki panresponder
export default class App extends React.Component {
  state = {
    backlogCards: [],
    inProgressCards: [],
    doneCards: [],
    isDialogVisible: false
  };

  addCard = () => {
    this.setState({ isDialogVisible: true });
  };
  sendInput = inputText => {
    temp = this.state.backlogCards;
    temp.push(inputText);
    this.setState({ backlogCards: temp, isDialogVisible: false });
    //console.log(this.state.backlogCards.toString());
    AsyncStorage.setItem("backlog", this.state.backlogCards.toString());
  };
  showDialog = show => {
    this.setState({ isDialogVisible: show });
  };
  moveCard = (current, toMove) => {
    console.log("moving " + toMove);
    console.log(current);
    console.log(this.state.doneCards);
    if (current === this.state.backlogCards) {
      let tempCurrent = this.state.backlogCards;
      let tempNext = this.state.inProgressCards;
      let index = tempCurrent.indexOf(toMove);
      console.log(index);
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
      console.log(index);
      if (index !== -1) {
        tempCurrent.splice(index, 1);
        this.setState({ doneCards: tempCurrent });
      }
    }

    AsyncStorage.multiSet([
      ["backlog", this.state.backlogCards.toString()],
      ["inProgress", this.state.inProgressCards.toString()],
      ["done", this.state.doneCards.toString()]
    ]);
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

    AsyncStorage.multiSet([
      ["backlog", this.state.backlogCards.toString()],
      ["inProgress", this.state.inProgressCards.toString()],
      ["done", this.state.doneCards.toString()]
    ]);
  };
  componentDidMount() {
    AsyncStorage.multiGet(["backlog", "inProgress", "done"], (err, data) => {
      if (data === null) {
        console.log("Data empty");
        AsyncStorage.multiSet([
          ["backlog", "Your tasks will be shown here"],
          ["inProgress", "Tap a card to delete or move them"],
          ["done", "Hopefully you find this app useful :)"]
        ]);
      } else {
        console.log("Data: ", data);
      }
    });
    AsyncStorage.getItem("backlog", (err, data) => {
      console.log("get back");
      if (data !== null) {
        console.log("Set backlog " + data);
        let backlog = data.split(",");
        this.setState({ backlogCards: backlog });
        console.log(this.state.backlogCards.toString());
      }
    });
    AsyncStorage.getItem("inProgress", (err, data) => {
      console.log("get progress");
      if (data !== null) {
        console.log("Set inProgress " + data);
        let inProgress = data.split(",");
        this.setState({ inProgressCards: inProgress });
        console.log(this.state.inProgressCards.toString());
      }
    });
    AsyncStorage.getItem("done", (err, data) => {
      console.log("get done");
      if (data !== null) {
        console.log("Set done " + data);
        let done = data.split(",");
        this.setState({ doneCards: done });
        console.log(this.state.doneCards.toString());
      }
    });
  }
  componentDidUpdate(prevState) {
    if (prevState !== this.state) console.log("Statet eroo", this.state);
  }
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
            title="TO DO"
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
            title="IN PROGRESS"
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
            title="DONE"
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
