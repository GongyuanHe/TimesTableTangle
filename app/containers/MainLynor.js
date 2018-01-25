'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Button,
  Alert,
  AsyncStorage,
  AppState,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  Timer,
  CellSize,
  BoardWidth,
} from '../components';
import BoardLynor from '../components/BoardLynor';
import RecordModalComponent from '../components/RecordModalComponent';
import GameFailedComponent from '../components/GameFailedComponent';

const formatTime = Timer.formatTime;

class MainLynor extends Component {
  constructor(props) {
      super(props);
      this.state = {
        PreviousTimeRecord: '',
        PreviousHistoryRecord: '',
        TimeRecord: '',
      };
  }

  onInit = () => {
      this.timer.start();
  }

  handeleAppStateChange = (currentAppState) => {
    if (currentAppState != 'active') {
      this.timer.pause();
    }else {
      this.timer.resume();
    }
  }

  async componentDidMount() {
    this.onInit();
    AppState.addEventListener('change', this.handeleAppStateChange);
    let value1 = await AsyncStorage.getItem('record');
    let value2 = await AsyncStorage.getItem('history');
    if (value1 !== null ) {
        this.setState({
          PreviousTimeRecord: value1,
        });
    }
    if (value2 !== null ) {
        this.setState({
          PreviousHistoryRecord: value2,
        });
    }
  }

  componentWillUnmount () {
    AppState.removeEventListener('change', this.handeleAppStateChange);
  }

  onFinish = (size,accuracy,today,Screenshot0,Screenshot1,Screenshot2,Screenshot3,Screenshot4,Screenshot5,Screenshot6,Screenshot7,Screenshot8,Screenshot9,Screenshot10) => {
    this.timer.stop();
    let TimeRecord = this.timer.getElapsed();
    this.setState({
      TimeRecord: TimeRecord,
    })
    let HistoryArray= [];
    let HistoryString = '';
    let HistoryRecordString='';
    HistoryArray.push(size);
    HistoryArray.push(TimeRecord);
    HistoryArray.push(accuracy);
    let todayString = `${today.getMonth()+1}/${today.getDate()}/${today.getYear()%100} ${today.getHours()}:${today.getMinutes()}`;
    HistoryArray.push(todayString);
    HistoryArray.push(Screenshot0);
    HistoryArray.push(Screenshot1);
    HistoryArray.push(Screenshot2);
    HistoryArray.push(Screenshot3);
    HistoryArray.push(Screenshot4);
    HistoryArray.push(Screenshot5);
    HistoryArray.push(Screenshot6);
    HistoryArray.push(Screenshot7);
    HistoryArray.push(Screenshot8);
    HistoryArray.push(Screenshot9);
    HistoryArray.push(Screenshot10);
    HistoryString = HistoryArray.join('|');
    HistoryArray= [];

    //store time
    let RecordStringArray = '';
    let RecordArray = [];
    if ( this.state.PreviousTimeRecord=='' ) {
            RecordArray.push(TimeRecord);
            RecordStringArray = JSON.stringify(RecordArray);
    } else {
            RecordArray = JSON.parse(this.state.PreviousTimeRecord);
            if (RecordArray.length<10){
                RecordArray.push(TimeRecord);
                RecordArray.sort(function(a, b) {
                      return a - b;
                });
            } else {
              if ( RecordArray[9] >= TimeRecord ){
                 RecordArray[9]=TimeRecord;
                 RecordArray.sort(function(a, b) {
                    return a - b;
                 });
              }
            }
      RecordStringArray = JSON.stringify(RecordArray);
    }
    AsyncStorage.setItem('record',RecordStringArray);

    //store history
    if (this.state.PreviousHistoryRecord=='') {
        HistoryArray.push(HistoryString);
        HistoryRecordString= JSON.stringify(HistoryArray);

    } else {
        HistoryArray = JSON.parse(this.state.PreviousHistoryRecord);
        HistoryArray.push(HistoryString);
        HistoryRecordString= JSON.stringify(HistoryArray);
    }
    AsyncStorage.setItem('history',HistoryRecordString);
    this.Modal.onGameFinished();
  }

  onFailed = (size,accuracy,today,Screenshot0,Screenshot1,Screenshot2,Screenshot3,Screenshot4,Screenshot5,Screenshot6,Screenshot7,Screenshot8,Screenshot9,Screenshot10) =>{
    this.timer.stop();
    let TimeRecord = this.timer.getElapsed();
    this.setState({
      TimeRecord: TimeRecord,
    })
    let HistoryArray= [];
    let HistoryString = '';
    let HistoryRecordString='';
    HistoryArray.push(size);
    HistoryArray.push(TimeRecord);
    HistoryArray.push(accuracy);
    let todayString = `${today.getMonth()+1}/${today.getDate()}/${today.getYear()%100} ${today.getHours()}:${today.getMinutes()}`;
    HistoryArray.push(todayString);
    HistoryArray.push(Screenshot0);
    HistoryArray.push(Screenshot1);
    HistoryArray.push(Screenshot2);
    HistoryArray.push(Screenshot3);
    HistoryArray.push(Screenshot4);
    HistoryArray.push(Screenshot5);
    HistoryArray.push(Screenshot6);
    HistoryArray.push(Screenshot7);
    HistoryArray.push(Screenshot8);
    HistoryArray.push(Screenshot9);
    HistoryArray.push(Screenshot10);
    HistoryString = HistoryArray.join('|');
    HistoryArray= [];
    if (this.state.PreviousHistoryRecord=='') {
        HistoryArray.push(HistoryString);
        HistoryRecordString= JSON.stringify(HistoryArray);

    } else {
        HistoryArray = JSON.parse(this.state.PreviousHistoryRecord);
        HistoryArray.push(HistoryString);
        HistoryRecordString= JSON.stringify(HistoryArray);
    }
    AsyncStorage.setItem('history',HistoryRecordString);
    this.failedModal.onGameFailed();
  }

  onThrowing = () => {
        this.timer.stop();
        this.failedModal.onGameFailed();
  }

  render() {
    const { navigate } = this.props.navi;
    let range = "";
    if (this.props.level=='1') {
      if (this.props.size==10) {
          range="2-10";
      }else {
          range="2-7";
      }
    }else if (this.props.level=='2'){
          range="2-12";
    }else {
          range="5-15";
    }
    return (
      <View style={styles.container} >
        <View style={styles.header} >
          <Icon
              name='home'
              color='#3498db'
              size={BoardWidth/8}
              onPress={() => navigate('Home')}/>
          <Text style={styles.level}>Level {this.props.level}</Text>
          <Icon
            name='repeat'
            color='#3498db'
            size={BoardWidth/8}
            onPress={() => navigate('Setting')}/>
        </View>
        <Text style={styles.range}>Range:{range}</Text>
        <BoardLynor size={this.props.size} level={this.props.level} finish={this.onFinish} model={this.props.model} failed={this.onFailed} throwing={this.onThrowing}/>
        <Timer ref={ref => this.timer = ref} style={styles.timer} />
        <RecordModalComponent ref={ref => this.Modal = ref} navi={this.props.navi} elapsedTime = {this.state.TimeRecord}/>
        <GameFailedComponent ref={ref => this.failedModal = ref} navi={this.props.navi} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#90daed',
  },
  header: {
    width: BoardWidth,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timer: {
    fontSize: 1,
    alignSelf: 'center',
    color: '#90daed',
    opacity: 1,
  },
  level: {
    fontSize: BoardWidth/7,
    fontWeight: 'bold',
    color: '#3498db',
  },
  range: {
    fontSize: BoardWidth/18,
    fontWeight: 'bold',
    color: '#3498db',
    paddingBottom: 0,
  }
});
export default MainLynor;
