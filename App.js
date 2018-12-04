import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Button } from 'react-native';
import StatusBarBackground from './StatusBarBackground';
import DialogInput from 'react-native-dialog-input';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
//Tutki panresponder
export default class App extends React.Component {

  state = { cards: ["Testilappu"],
           isDialogVisible: false 
          };

  addCard = () => {

    this.setState({isDialogVisible: true});
  }
  sendInput = inputText => {
    temp = this.state.cards;
    temp.push(inputText);
    this.setState({cards: temp, isDialogVisible: false});
  }
  showDialog = show => {
    this.setState({isDialogVisible: show});
  }
  render() {
    return (
      <View>
        <StatusBarBackground />
        <ScrollView 
        ref={(scrollView) => { this.scrollView = scrollView; }}
        style={styles.container}
        //pagingEnabled={true}
        horizontal= {true}
        decelerationRate={0}
        snapToInterval={width / 1.45}
        snapToAlignment={"center"}
        contentInset={{
          top: 0,
          left: 30,
          bottom: 0,
          right: 30,
        }}>
        <View style={styles.view} >
          <Button title="Add" onPress={this.addCard}/>
          <DialogInput isDialogVisible={this.state.isDialogVisible}
            title={"Task input"}
            message={"Name task"}
            hintInput ={"Enter title for task"}
            submitInput={ (inputText) => {this.sendInput(inputText)} }
            closeDialog={ () => {this.showDialog(false)}}>
          </DialogInput>
          { this.state.cards.map((item, key) => (
            <View key={key} style={styles.card}>
              <Text style={{textAlign: 'center'}}>{ item } </Text>
            </View>
          ))}
        </View>
        <View style={styles.view2} />
        <View style={styles.view3} />
      </ScrollView>
    </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  view: {
    backgroundColor: 'lightskyblue',
    width: width - 80,
    height: height,
    borderRadius: 10,
    alignContent: 'center',
    //paddingHorizontal : 30
  },
  view2: {
    backgroundColor: 'crimson',
    width: width - 80,
    height: height,
    borderRadius: 10,
    alignContent: 'center',
    //paddingHorizontal : 30
  },
  view3: {
    backgroundColor: 'limegreen',
    width: width - 80,
    height: height,
    borderRadius: 10,
    alignContent: 'center',
    //paddingHorizontal : 30
  },
  card: {
    margin: 10,
    backgroundColor: 'lightgrey',
    width: width - 100,
    height: 100,
    alignContent: 'center'
  }
});
