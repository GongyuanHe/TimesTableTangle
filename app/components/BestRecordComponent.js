import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
} from 'react-native';

import {
  BoardWidth,
} from './GlobalStyle';

class BestRecordComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TimeRecord: [],
    };
  }

  async componentDidMount () {

      let value = await AsyncStorage.getItem('record');
      if(value!==null) {
          value = JSON.parse(value);
          this.setState({
            TimeRecord: value,
          });
      }

  }

  render () {
        if(this.state.TimeRecord==''){
          return (<View style={styles.container}><Text style={styles.text}>No record!</Text></View>);
        }else {
          return (
                <View style={styles.container}>
                {
                  this.state.TimeRecord.map( (item,i)=> {
                    let hour = Math.floor(item / 60 / 60);
                    let minute = Math.floor(item / 60 - hour * 60);
                    let second = item % 60;
                    item =  [hour, minute, second].map(x => x < 10 ? '0' + x : x).join(':');
                    return <Text style={styles.text} key={i}>{i+1}. {item}</Text>
                  })
                }
                </View>
          )
        }
  }
}
const styles = StyleSheet.create({
  container:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: BoardWidth*3/42,
  },
});
export default BestRecordComponent;
