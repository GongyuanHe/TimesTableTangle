import React, { Component } from 'react';
import {
  StyleSheet,
  StatusBar,
  UIManager,
  View,
  Text,
} from 'react-native';

import MainLynor from '../containers/MainLynor';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);



class GameScreen extends Component {

  static navigationOptions = {
    title: 'Game',
    header: null
  };
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container} >
        <MainLynor navi = {this.props.navigation} size={params.size} level={params.level} model={params.model}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
});

export default GameScreen;
