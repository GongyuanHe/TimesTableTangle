'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';

import {
  BoardWidth,
} from './GlobalStyle';
import Touchable from './Touchable';



class CellLynor extends Component {


  constructor(props) {
    super(props);
    this.state = {
      fixedCell : this.props.initFixed,
      userInput : '',
      selected: '',
      answer : '',
      wrong : '',
      unselectable: this.props.unselectable,
    };
  }

  handlePress = () => {
    if (this.state.fixedCell || this.state.unselectable || this.props.multiple){

    } else {
      this.props.onCellSelect(this.props.index);
    }
  }
  setFixedState = (f) => {
    this.setState({
      fixedCell : f ,
    });
  }

  setSelecetedState = (s) => {
    this.setState({
      selected : s ,
    });
  }

  setUserInputState = (u) => {
    this.setState({
      userInput : u ,
    });
  }

  setAnswerState = (a) => {
    this.setState({
      answer : a ,
    });
  }

  setWrongState = (w) => {
    this.setState({
      wrong : w ,
    });
  }
  componentWillUnmount(){
    this.setState({
      fixedCell : '',
      userInput : '',
      selected: '',
      answer : '',
      wrong : '',
    });
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.initFixed !== nextProps.initFixed) {
      this.setState({
        fixedCell: nextProps.initFixed,
      })
    }
    if(this.props.unselectable !== nextProps.unselectable){
      this.setState({
        unselectable: nextProps.unselectable,
      })
    }
  }

  render() {
    let i =this.props.cellNumberPerRow;
    let CellBottomWidth= this.props.CellBottomWidth;
    let CellRightWidth = this.props.CellRightWidth;
    let CellLeftWidth = this.props.CellLeftWidth;
    let CellTopWidth = this.props.CellTopWidth;
    i++;
    const cellWidth = BoardWidth/i;
    return(
      <Touchable onPress={this.handlePress}>
        <View style={[
                       {
                         width: cellWidth,
                         height: cellWidth,
                         borderBottomWidth: CellBottomWidth,
                         borderRightWidth: CellRightWidth,
                         borderTopWidth: CellTopWidth,
                         borderLeftWidth: CellLeftWidth,
                       },
                      styles.cell,
                      this.props.multiple&&styles.multiple,
                      this.state.fixedCell&&styles.fixedCell,
                      this.state.unselectable&&styles.fixedCell,
                      this.state.selected&&styles.selectedCell,
                      this.state.answer&&styles.rightCell,
                      this.state.wrong&&styles.wrongGuess,
                    ]}>
                    {
                      this.props.multiple ? (
                        <Text style={[this.props.multiple&&styles.timesText,
                                      {fontSize: cellWidth * 3 / 6}
                                    ]} >
                                    {this.props.CellNumber}
                        </Text>
                      ):[
                             this.state.fixedCell ? (
                              <Text key = '1' style={[this.state.fixedCell&&styles.fixedText,
                                            {fontSize: cellWidth * 3 / 8}
                                          ]} >
                                          {this.props.CellNumber}
                              </Text>
                            ):(
                              <Text key = '0' style={[styles.userInputText,
                                            {fontSize: cellWidth * 3 / 8}
                                          ]} >
                                          {this.state.userInput}
                              </Text>
                            )
                       ]
                    }
        </View>
      </Touchable>
    )
  }
}
const styles = StyleSheet.create({
  cell: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#2980b9',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fixedText: {
     color: 'white',
     fontWeight: 'bold',
     borderWidth: 0,
  },
  userInputText: {
    color: 'black',
    fontWeight: 'bold',
    borderWidth: 0,
  },
  multiple: {
    backgroundColor: '#3498db',
  },
  timesText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: BoardWidth/10,
  },
  fixedCell: {
    backgroundColor: '#9999ff',
  },
  rightCell: {
    backgroundColor: '#00b300',
  },
  selectedCell: {
    backgroundColor: '#ffff00',
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },
  wrongGuess: {
    backgroundColor: '#ff4d4d',
  }
})
export default CellLynor;
