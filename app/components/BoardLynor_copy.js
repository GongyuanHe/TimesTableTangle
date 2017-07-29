'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import {
  BoardWidth,
  SmallSizePattern,
  LargeSizePattern,
} from './GlobalStyle';
import {
  Timer,
} from '../components';

import CellLynor from '../components/CellLynor';
import StackCellLynor from '../components/StackCellLynor';




class BoardLynor extends Component {
  cells=[];

  constructor(props) {
    super(props);
    //generate Cover
    let i=0,j=0,len1 = this.props.size, level = this.props.level,fixNumberArray=[];

    //generate GameNumber
    let NumberArray=[];
    for (i=0;i<len1;i++){
      for (j=0;j<len1;j++){
        if(i==0 && j==0){
          NumberArray.push(0);
        }else if( i==0 ){
          NumberArray.push(Math.floor(Math.random() * (15 - (15-len1)))+(15-len1));
        }else if (j!=0){
          NumberArray.push( NumberArray[i*len1] * NumberArray[j] );
        }else{
          NumberArray.push(Math.floor(Math.random() * (15 - (15-len1)))+(15-len1));
        }
      }
    }
    this.state = {
      size: this.props.size,
      selections: [],
      userInput: '',
      userInputArray: [],
      test: '',
      NumberArray: NumberArray,
      fixNumberArray: [len1*len1],
      checkingArray: [],
      wrongAnswerArray: [],
      wrong: 0,
      right: 0,

    };
    NumberArray=[];
    fixNumberArray=[];

  }
  shouldComponentUpdate(nextProps, nextState) {
      return false;
   }

  onDelete = () => {
    let userInputArray = this.state.userInputArray;
    let wrongAnswerArray = this.state.wrongAnswerArray;
    if ((this.state.selections.every( x => x=='' ))){

    }else {
      let currentSelection = this.state.selections.indexOf(true);
      let userInput = this.state.userInputArray[currentSelection];
      userInput = Math.floor(userInput/10 );
      if (userInput == 0 ){
        userInput = '';
        wrongAnswerArray[currentSelection] = false;
      }
      userInputArray[currentSelection] = userInput;
      this.setState({
            userInput: userInput,
            userInputArray : userInputArray,
            wrongAnswerArray : wrongAnswerArray,
      });
      this.cells[currentSelection].setUserInputState(this.state.userInputArray[currentSelection]);
      this.cells[currentSelection].setWrongState(this.state.wrongAnswerArray[currentSelection]);
      userInputArray = [];
      wrongAnswerArray = [];
    }
  }

  onChecking = () => {
    let wrong = this.state.wrong;
    let right = this.state.right;
    let size = this.props.size;
    let accuracy = right/(wrong+right);
    let today = new Date();
    let checkingArray = this.state.checkingArray;
    let fixNumberArray = this.state.fixNumberArray;
    let wrongAnswerArray = this.state.wrongAnswerArray;
    if ((this.state.selections.every( x => x=='' ))) {

    }else {
      let currentSelection = this.state.selections.indexOf(true);
      let userInput = this.state.userInputArray[currentSelection];
      if ( userInput == this.state.NumberArray[currentSelection]){
          wrongAnswerArray[currentSelection] = false;
          checkingArray[currentSelection]=true;
          fixNumberArray[currentSelection]= 1;
          right=right+1;
      }else{
          checkingArray[currentSelection]=false;
          wrongAnswerArray[currentSelection] = true;
          wrong=wrong+1;
      }
      this.setState({
        checkingArray : checkingArray,
        fixNumberArray: fixNumberArray,
        wrongAnswerArray: wrongAnswerArray,
        right: right,
        wrong: wrong,
      });
      this.cells[currentSelection].setFixedState(this.state.fixNumberArray[currentSelection]);
      this.cells[currentSelection].setAnswerState(this.state.checkingArray[currentSelection]);
      this.cells[currentSelection].setWrongState(this.state.wrongAnswerArray[currentSelection]);
      if (fixNumberArray.every( x => x==1 )){
           this.props.finish(size,accuracy,today);
      }
    }
    checkingArray = [];
    fixNumberArray = [];
    wrongAnswerArray = [];
  }

  componentDidMount () {
   let userInputArray=[],len1 = this.state.size,i=0;
    for ( i = 0 ; i < len1 * len1 ; i++ ){
      userInputArray.push(0);
    }

    this.setState({
      userInputArray : userInputArray,
    });
  }

  componentWillUnmount () {
    this.setState({
      selections: [],
      userInput: '',
      userInputArray: [],
      test: '',
      NumberArray: NumberArray,
      fixNumberArray: fixNumberArray,
      checkingArray: [],
      wrongAnswerArray: [],
    });

  }
  onCellSelect = (index) => {
    let currentSelection=index;
    let previousSelection = '';
    let selections = this.state.selections;
    if ((selections.every( x => x=='' ))){

    }else{
      previousSelection = this.state.selections.indexOf(true);
      this.cells[previousSelection].setSelecetedState(false);
    }

    let userInput = this.state.userInput;
    selections = [];
    userInput = '';
    this.setState({
        selections: selections,
        userInput : userInput,
    });
    selections[index] = true;
    this.setState({
        selections: selections,
    });
    this.cells[currentSelection].setSelecetedState(true);
    selections = [];
  }

  onStackSelect = (index) => {
    let userInput = this.state.userInput;
    let userInputArray = this.state.userInputArray;
    if ((this.state.selections.every( x => x=='' ))) {

    }else{
          let currentSelection = this.state.selections.indexOf(true);
          userInput = ( userInput*10 + index) % 1000;
          userInputArray[currentSelection] = userInput;
          this.setState({
                userInput: userInput,
                userInputArray : userInputArray,
          });
          this.cells[currentSelection].setUserInputState(this.state.userInputArray[currentSelection]);
    }
    userInputArray = [];

  }

  render() {
    let loop1 = [], loop2 = [], j = 0, i = 0, len1 = this.state.size, len2 = 5;
    let fixNumberArray = this.state.fixNumberArray;
    len1=len1*len1;
    while (++i <= len1) loop1.push(i);
    while (++j <= len2) loop2.push(j);
    return(
    <View style={styles.boardContainer}>
        <View style={styles.board}>
        {
          loop1.map( (item,i)=> {
            if(i==0){
                    return <
                            CellLynor key={i} index={i}
                            cellNumberPerRow= {this.state.size}
                            CellBottomWidth = {3}
                            CellRightWidth = {3}
                            CellNumber = 'X'
                            onCellSelect = {this.onCellSelect}
                            ref={ref => this.cells[i] = ref}
                            initFixed = {fixNumberArray[i]}
                           />
            }else if (i == 1){
              return <
                      CellLynor key={i} index={i}
                      cellNumberPerRow= {this.state.size}
                      CellNumber = {this.state.NumberArray[i]}
                      CellBottomWidth = {3}
                      CellLeftWidth = {3}
                      onCellSelect = {this.onCellSelect}
                      ref={ref => this.cells[i] = ref}
                      initFixed = {fixNumberArray[i]}
                      />
            }else if (i == this.state.size) {
              return <
                      CellLynor key={i} index={i}
                      cellNumberPerRow= {this.state.size}
                      CellNumber = {this.state.NumberArray[i]}
                      CellTopWidth = {3}
                      CellRightWidth = {3}
                      onCellSelect = {this.onCellSelect}
                      ref={ref => this.cells[i] = ref}
                      initFixed = {fixNumberArray[i]}
                     />
            }else if (i == ( this.state.size + 1 )){
              return <
                      CellLynor key={i} index={i}
                      cellNumberPerRow= {this.state.size}
                      CellNumber = {this.state.NumberArray[i]}
                      CellTopWidth = {3}
                      CellLeftWidth = {3}
                      onCellSelect = {this.onCellSelect}
                      ref={ref => this.cells[i] = ref}
                      initFixed = {fixNumberArray[i]}
                     />
            }else if ( i< this.state.size ){
              return <
                      CellLynor key={i} index={i}
                      cellNumberPerRow= {this.state.size}
                      CellNumber = {this.state.NumberArray[i]}
                      CellBottomWidth = {3}
                      onCellSelect = {this.onCellSelect}
                      ref={ref => this.cells[i] = ref}
                      initFixed = {fixNumberArray[i]}
                     />
            }else if (i < (this.state.size * 2)){
              return <
                      CellLynor key={i} index={i}
                      cellNumberPerRow= {this.state.size}
                      CellNumber = {this.state.NumberArray[i]}
                      CellTopWidth = {3}
                      onCellSelect = {this.onCellSelect}
                      ref={ref => this.cells[i] = ref}
                      initFixed = {fixNumberArray[i]}
                     />
            }else if ( i % this.state.size == 0){
              return <
                      CellLynor key={i} index={i}
                      cellNumberPerRow= {this.state.size}
                      CellNumber = {this.state.NumberArray[i]}
                      CellRightWidth = {3}
                      onCellSelect = {this.onCellSelect}
                      ref={ref => this.cells[i] = ref}
                      initFixed = {fixNumberArray[i]}
                     />
            }else if ( i % this.state.size == 1){
              return <
                      CellLynor key={i} index={i}
                      cellNumberPerRow= {this.state.size}
                      CellNumber = {this.state.NumberArray[i]}
                      CellLeftWidth = {3}
                      onCellSelect = {this.onCellSelect}
                      ref={ref => this.cells[i] = ref}
                      initFixed = {fixNumberArray[i]}
                     />
            }else{
              return <
                      CellLynor key={i} index={i}
                      cellNumberPerRow= {this.state.size}
                      CellNumber = {this.state.NumberArray[i]}
                      onCellSelect = {this.onCellSelect}
                      ref={ref => this.cells[i] = ref}
                      initFixed = {fixNumberArray[i]}
                     />
            }

          })
        }
        </View>
      <View style={styles.stack}>
        <View style={styles.stackContainer} >
        {
          loop2.map( (item,i)=> {
            return <
                    StackCellLynor key={i} index = {item-1}
                    StackCellText={item-1}
                    onStackSelect = {this.onStackSelect}
                     />
          })
        }
        </View>
        <View style={styles.stackContainer} >
        {
          loop2.map( (item,i)=> {
            return <
                    StackCellLynor key={i} index = {item+4}
                    StackCellText={item+4}
                    onStackSelect = {this.onStackSelect}
                    />
          })
        }
        </View>
            <View style={styles.stackContainer} >
                <TouchableHighlight underlayColor="black" onPress={this.onDelete}>
                   <View style = {styles.buttonContainer}>
                           <Icon
                             name='times'
                             color='white'
                             size={BoardWidth/8}/>
                   </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="black" onPress={this.onChecking}>
                   <View style = {styles.buttonContainer} >
                           <Icon
                             name='check-circle-o'
                             color='white'
                             size={BoardWidth/8}/>
                   </View>
                </TouchableHighlight>
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
    width: BoardWidth,

  },
  board: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#90daed',
    padding: 2,
  },
  stackContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 2,
  },
  buttonContainer: {
    width: BoardWidth/4,
    height: BoardWidth/6,
    backgroundColor: '#2980b9',
    borderWidth: 1,
    borderColor: '#90daed',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
export default BoardLynor;
