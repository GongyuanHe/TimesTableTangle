'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import {
  BoardWidth,
} from './GlobalStyle';



class CheckScreenComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: this.props.data[4],
      mode: this.props.data[5],
      NumberArray: this.props.data[6],
      CoverArray: this.props.data[7],
      UnselectArray: this.props.data[8],
      GreenArray: this.props.data[9][this.props.index].split(','),
      RedArray: this.props.data[10][this.props.index].split(','),
      UserInputArray: this.props.data[11][this.props.index].split(','),
    };
    console.log(this.props.data);
  }

  render () {
    let size=this.state.size;
    size++;

    return (
      <View style={{justifyContent:'center', alignItems:'center'}}>
      <View style={styles.boardContainer}>
          <View style= {styles.board}>
             {
               this.state.NumberArray.map((item,i)=>{
                 return(
                   <View key={i} style={[styles.cell,
                                         {
                                           height: BoardWidth*0.8/size,
                                           width: BoardWidth*0.8/size,
                                         },
                                         (this.state.CoverArray[i]==1 || this.state.UnselectArray[i]==1)&&styles.fixedCell,
                                         this.state.GreenArray[i]=='true' && styles.rightCell,
                                         this.state.RedArray[i]=='true' && styles.wrongCell,
                                         i==0 && styles.multiple,
                                       ]}>
                      {
                        i==0 ? (
                          <Text style={styles.timesText}>X</Text>
                        ):(
                          this.state.CoverArray[i]==1 ? (
                            <Text style={styles.fixedText}>{item}</Text>
                          ):(
                            this.state.UserInputArray[i] ? (
                              <Text style={styles.userInputText}>{this.state.UserInputArray[i]}</Text>
                            ) : (
                              <Text></Text>
                            )
                          )
                        )

                      }

                   </View>
                 )
               })
             }
          </View>
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  boardContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: BoardWidth*0.8,
    justifyContent: 'center',
  },
  board: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#90daed',
    padding: 2,
  },
  cell: {
    borderWidth: 1,
    borderColor: '#2980b9',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  wrongCell: {
    backgroundColor: '#ff4d4d',
  },
  fixedCell: {
    backgroundColor: '#9999ff',
  },
  rightCell: {
    backgroundColor: '#00b300',
  },
  fixedText: {
     color: 'white',
     fontWeight: 'bold',
     fontSize: BoardWidth*0.8/23,
  },
  userInputText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: BoardWidth*0.8/23,
  },
  multiple: {
    backgroundColor: '#3498db',
  },
  timesText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: BoardWidth*0.8/15,
  },
})
export default CheckScreenComponent;
