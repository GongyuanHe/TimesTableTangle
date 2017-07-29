'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

import {
  BoardWidth,
} from './GlobalStyle';
import Touchable from './Touchable';

const cellWidth = BoardWidth/6;

class StackCellLynor extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handlePress = () => {
    this.props.onStackSelect(this.props.index);
  }

  render() {

    return(
      <Touchable underlayColor="black" onPress={this.handlePress}>
          <View style={styles.StackCellContainer}>
                <Text style={styles.StackCellContent}>{this.props.StackCellText}</Text>
          </View>
      </Touchable>
    )
  }
}
const styles = StyleSheet.create({
  StackCellContainer: {
    width: cellWidth,
    height: cellWidth,
    backgroundColor: '#2980b9',
    borderWidth: 1,
    borderColor: '#90daed',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  StackCellContent: {
    color: 'white',
    fontSize: cellWidth * 2 / 3,
    fontWeight: 'bold'
  },
})
export default StackCellLynor;
