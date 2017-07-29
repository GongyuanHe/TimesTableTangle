'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
} from 'react-native';

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

import BestRecordComponent from './BestRecordComponent';
import HistoryComponent from './HistoryComponent';
import {
  BoardWidth,
} from './GlobalStyle';



class RecordPageComponent extends Component {


  render () {
    return (
      <View>
          <ScrollableTabView
                style={{marginTop: 20}}
                renderTabBar={() => <DefaultTabBar />}
                tabBarInactiveTextColor = 'white'
                tabBarActiveTextColor = '#2980b9'
                tabBarUnderlineStyle = {{backgroundColor: '#2980b9'}}
                tabBarTextStyle = {{fontSize: BoardWidth*3/50, fontWeight: 'bold'}}
          >
              <BestRecordComponent tabLabel='Best Record' />
              <HistoryComponent tabLabel='History'/>
          </ScrollableTabView>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})
export default RecordPageComponent;
