import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export default class App extends React.Component {
  render() {
    return (
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
      <View style={styles.view} />
      <View style={styles.view2} />
      <View style={styles.view3} />
    </ScrollView>
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
    //paddingHorizontal : 30
  },
  view2: {
    backgroundColor: 'crimson',
    width: width - 80,
    height: height,
    borderRadius: 10,
    //paddingHorizontal : 30
  },
  view3: {
    backgroundColor: 'limegreen',
    width: width - 80,
    height: height,
    borderRadius: 10,
    //paddingHorizontal : 30
  },
});
