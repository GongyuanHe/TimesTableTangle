'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
} from 'react-native';

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

import CheckScreenComponent from './CheckScreenComponent';
import {
  BoardWidth,
} from './GlobalStyle';



class CheckPageComponent extends Component {


  render () {
    let item=[];
    let j = 0;
    for(let i=this.props.data[12];i<3;i++){
      j++;
      let a='Check'.concat(j);
      item.push(<CheckScreenComponent index={j-1} data={this.props.data} key = {i} tabLabel={a} />);
    }
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
              {item}
          </ScrollableTabView>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})
export default CheckPageComponent;
