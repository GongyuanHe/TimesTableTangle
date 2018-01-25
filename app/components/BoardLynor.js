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

    this.state = {
      size: this.props.size,
      selections: [],
      userInput: '',
      userInputArray: [],
      NumberArray: [],
      initFixArray: [],
      unselectableArray: [],
      fixNumberArray: [],
      checkingArray: [],
      wrongAnswerArray: [],
      wrong: 0,
      right: 0,
      checkCounter: 3,
      Screenshot:[],

    };


  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.initFixArray !== nextState.initFixArray) {
      return true;
    }
    if(this.state.NumberArray !== nextState.NumberArray){
      return true;
    }
    if(this.state.checkCounter !== nextState.checkCounter){
      return true;
    }
    if(this.props.model==0){
      if(this.state.unselectableArray!==nextState.unselectableArray){
        return true;
      }
    }
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
        userInput='';
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
    let checkCounter= this.state.checkCounter;
    checkCounter=checkCounter-1;
    let Screenshot=this.state.Screenshot;
    this.setState({
      checkCounter: checkCounter,
    });
    let wrong = this.state.wrong;
    let right = this.state.right;
    let size = this.props.size;
    let today = new Date();
    var checkingArray = this.state.checkingArray;
    let fixNumberArray = this.state.fixNumberArray;
    let wrongAnswerArray = this.state.wrongAnswerArray;
    let userInputArray=this.state.userInputArray;
    if ((this.state.selections.every( x => x=='' ))) {
      if(checkCounter==0){

      }
    }else {
      for (let j= 0;j < this.state.userInputArray.length;j++){
        if(this.state.userInputArray[j] !== '' && this.state.userInputArray[j]!==''){
              let currentSelection = j;

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
                userInputArray: userInputArray,
              });
              this.cells[currentSelection].setFixedState(this.state.fixNumberArray[currentSelection]);
              this.cells[currentSelection].setAnswerState(this.state.checkingArray[currentSelection]);
              this.cells[currentSelection].setWrongState(this.state.wrongAnswerArray[currentSelection]);
        }
      }
    }
    let accuracy = right/(right+wrong);
    var a=new Array();
    var b=new Array();
    var c=new Array();
    a=this.state.checkingArray.slice(0);
    b=this.state.wrongAnswerArray.slice(0);
    c=this.state.userInputArray.slice(0);
    Screenshot[5].push(a);
    Screenshot[6].push(b);
    Screenshot[7].push(c);
    Screenshot[8]=checkCounter;
    this.setState({
      Screenshot: Screenshot,
    });
    console.log(this.state.Screenshot[3]);
    if (fixNumberArray.every( x => x==1 )){
         Screenshot[5]=Screenshot[5].join('-');
         Screenshot[6]=Screenshot[6].join('-');
         Screenshot[7]=Screenshot[7].join('-');
         Screenshot[9]=true;
         this.props.finish(size,accuracy,today,Screenshot[0],Screenshot[1],Screenshot[2],Screenshot[3],Screenshot[4],Screenshot[5],Screenshot[6],Screenshot[7],Screenshot[8],Screenshot[9],Screenshot[10]);
    }else if(this.props.model==0){
      let quickGame=0;
      for(let i=0;i<size*size;i++){
        if (fixNumberArray[i]==1 && ( i<size || i % size==0 ) ){
          quickGame++;
        }
      }
      if ( quickGame==(size*2-1)){
        Screenshot[5]=Screenshot[5].join('-');
        Screenshot[6]=Screenshot[6].join('-');
        Screenshot[7]=Screenshot[7].join('-');
        Screenshot[9]=true;
        this.props.finish(size,accuracy,today,Screenshot[0],Screenshot[1],Screenshot[2],Screenshot[3],Screenshot[4],Screenshot[5],Screenshot[6],Screenshot[7],Screenshot[8],Screenshot[9],Screenshot[10]);
      }else if(checkCounter==0){
          Screenshot[5]=Screenshot[5].join('-');
          Screenshot[6]=Screenshot[6].join('-');
          Screenshot[7]=Screenshot[7].join('-');
          Screenshot[9]=false;
          this.props.failed(size,accuracy,today,Screenshot[0],Screenshot[1],Screenshot[2],Screenshot[3],Screenshot[4],Screenshot[5],Screenshot[6],Screenshot[7],Screenshot[8],Screenshot[9],Screenshot[10]);
      }
    }else if(checkCounter==0){
          Screenshot[5]=Screenshot[5].join('-');
          Screenshot[6]=Screenshot[6].join('-');
          Screenshot[7]=Screenshot[7].join('-');
          Screenshot[9]=false;
          this.props.failed(size,accuracy,today,Screenshot[0],Screenshot[1],Screenshot[2],Screenshot[3],Screenshot[4],Screenshot[5],Screenshot[6],Screenshot[7],Screenshot[8],Screenshot[9],Screenshot[10]);
    }
    checkingArray = [];
    fixNumberArray = [];
    wrongAnswerArray = [];
  }

  componentDidMount () {
    let SmallSizePattern = [
    	[1,0,0,0,0,0,0,
    	 0,1,0,0,0,0,0,
    	 0,1,1,0,0,0,0,
    	 0,0,1,1,0,0,0,
    	 0,0,0,1,1,0,0,
    	 0,0,0,0,1,1,0,
    	 0,0,0,0,0,1,1],
    	[1,0,0,0,0,0,0,
    	 0,1,0,0,0,0,0,
    	 0,0,1,0,0,1,0,
    	 0,1,0,1,0,0,0,
    	 0,0,1,0,1,0,0,
    	 0,0,0,1,0,1,0,
    	 0,0,0,0,1,0,1],
    	[1,0,0,0,0,0,0,
    	 0,1,0,0,0,0,1,
    	 0,0,1,0,0,1,0,
    	 0,0,0,1,1,0,0,
    	 0,0,0,0,1,0,0,
    	 0,0,0,1,0,1,0,
    	 0,0,1,0,0,0,1],
    	[1,0,0,0,0,0,0,
    	 0,0,0,1,0,0,0,
    	 0,0,0,1,1,0,0,
    	 0,0,1,0,1,0,0,
    	 0,0,1,0,0,1,0,
    	 0,1,0,0,0,1,0,
    	 0,1,0,0,0,0,1]
    ];
    let LargeSizePattern = [
    	[1,0,0,0,0,0,0,0,0,0,
    	 0,1,0,0,0,0,0,0,0,0,
    	 0,1,1,0,0,0,0,0,0,0,
    	 0,0,1,1,0,0,0,0,0,0,
    	 0,0,0,1,1,0,0,0,0,0,
    	 0,0,0,0,1,1,0,0,0,0,
    	 0,0,0,0,0,1,1,0,0,0,
    	 0,0,0,0,0,0,1,1,0,0,
    	 0,0,0,0,0,0,0,1,1,0,
    	 0,0,0,0,0,0,0,0,1,1],
    	[1,0,0,0,0,0,0,0,0,0,
    	 0,1,0,0,0,0,0,0,0,0,
    	 0,0,1,0,0,0,0,0,0,1,
    	 0,1,0,1,0,0,0,0,0,0,
    	 0,0,1,0,1,0,0,0,0,0,
    	 0,0,0,1,0,1,0,0,0,0,
    	 0,0,0,0,1,0,1,0,0,0,
    	 0,0,0,0,0,1,0,1,0,0,
    	 0,0,0,0,0,0,1,0,1,0,
    	 0,0,0,0,0,0,0,1,0,1],
    	[1,0,0,0,0,0,0,0,0,0,
    	 0,1,0,0,0,0,0,0,0,1,
    	 0,0,1,0,0,0,0,0,1,0,
    	 0,0,0,1,0,0,0,1,0,0,
    	 0,0,0,0,1,0,1,0,0,0,
    	 0,0,0,0,0,1,0,0,0,0,
    	 0,0,0,0,0,1,1,0,0,0,
    	 0,0,0,0,1,0,0,1,0,0,
    	 0,0,0,1,0,0,0,0,1,0,
    	 0,0,1,0,0,0,0,0,0,1],
    	[1,0,0,0,0,0,0,0,0,0,
    	 0,0,0,0,0,1,0,0,0,0,
    	 0,0,0,0,0,1,1,0,0,0,
    	 0,0,0,0,1,0,1,0,0,0,
    	 0,0,0,0,1,0,0,1,0,0,
    	 0,0,0,1,0,0,0,1,0,0,
    	 0,0,0,1,0,0,0,0,1,0,
    	 0,0,1,0,0,0,0,0,1,0,
    	 0,0,1,0,0,0,0,0,0,1,
    	 0,1,0,0,0,0,0,0,0,1]
    ];

    let userInputArray=[],len1 = this.state.size,i=0;
    for ( i = 0 ; i < len1 * len1 ; i++ ){
      userInputArray.push('');
    }
    this.setState({
      userInputArray : userInputArray,
    });
    let j=0,fixNumberArray=[];
    let max, min;
    min = Math.ceil(1);
    max = Math.floor(4);
    let patternNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    if(len1==7){
      fixNumberArray = SmallSizePattern[patternNumber-1];

    }else if(len1==10){
      fixNumberArray = LargeSizePattern[patternNumber-1];

    }

    //generate GameNumber
    let row=[],col=[];
    let random;
    let level=this.props.level;
    let minArray = [2,2,5];
    let maxArray = [len1,12,15]
    min = Math.ceil(minArray[level-1]);
    max = Math.floor(maxArray[level-1]);
    for(i=0;i<len1-1;i++){
      random=Math.floor(Math.random() * (max - min + 1)) + min;
      while (row.find( x => x==random)) {
        random=Math.floor(Math.random() * (max - min + 1)) + min;
      }
      row.push(random);
      random=Math.floor(Math.random() * (max - min + 1)) + min;
      while (col.find( x => x==random)) {
        random=Math.floor(Math.random() * (max - min + 1)) + min;
      }
      col.push(random);
    }


    let NumberArray=[];
    for (i=0;i<len1;i++){
      for (j=0;j<len1;j++){
        if(i==0 && j==0){
          NumberArray.push(0);
        }else if( i==0 ){
          NumberArray.push(row[j-1]);
        }else if (j!=0){
          NumberArray.push( NumberArray[i*len1] * NumberArray[j] );
        }else{
          NumberArray.push(col[i-1]);
        }
      }
    }

    this.setState({
      NumberArray: NumberArray,
      fixNumberArray: fixNumberArray,
      initFixArray: fixNumberArray,
    });

    let unselectableArray=[];
    if(this.props.model==0){

      for (i=0;i<len1*len1;i++){
            if( fixNumberArray[i] ){
              unselectableArray[i]=0;
            }else if ( i<len1 || i%len1 == 0 ){
              unselectableArray[i]=0;
            }else {
              unselectableArray[i]=1;
            }
      }
      this.setState({
        unselectableArray: unselectableArray,
      });

    }
    let Screenshot=new Array(11);
    Screenshot[0] = this.state.size;
    Screenshot[1] = this.props.model;
    Screenshot[2] = NumberArray;
    Screenshot[3] = fixNumberArray.slice(0);
    Screenshot[4] = unselectableArray;
    Screenshot[5] = new Array();
    Screenshot[6] = new Array();
    Screenshot[7] = new Array();
    Screenshot[10]=this.props.level
    this.setState({
      Screenshot: Screenshot,
    });
  }

  componentWillUnmount () {
    this.setState({
      selections: [],
      userInput: '',
      userInputArray: [],
      test: '',
      NumberArray: [],
      fixNumberArray: [],
      checkingArray: [],
      wrongAnswerArray: [],
      initFixArray: [],
    });

  }
  onCellSelect = (index) => {



    let currentSelection=index;
    let previousSelection = '';
    let selections = this.state.selections;

    let userInputArray = this.state.userInputArray;
    let wrongAnswerArray = this.state.wrongAnswerArray;
    if ((this.state.selections.every( x => x=='' ))){

    }else {
      let userInput = this.state.userInputArray[currentSelection];
      if( userInput == 0){
        userInput='';
      }
      if ( wrongAnswerArray[currentSelection] == true ){
        userInput='';
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
                            multiple = {1}
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
                      initFixed = {this.state.initFixArray[i]}
                      unselectable = {this.state.unselectableArray[i]}
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
                      initFixed = {this.state.initFixArray[i]}
                      unselectable = {this.state.unselectableArray[i]}
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
                      initFixed = {this.state.initFixArray[i]}
                      unselectable = {this.state.unselectableArray[i]}
                     />
            }else if ( i< this.state.size ){
              return <
                      CellLynor key={i} index={i}
                      cellNumberPerRow= {this.state.size}
                      CellNumber = {this.state.NumberArray[i]}
                      CellBottomWidth = {3}
                      onCellSelect = {this.onCellSelect}
                      ref={ref => this.cells[i] = ref}
                      initFixed = {this.state.initFixArray[i]}
                      unselectable = {this.state.unselectableArray[i]}
                     />
            }else if (i < (this.state.size * 2)){
              return <
                      CellLynor key={i} index={i}
                      cellNumberPerRow= {this.state.size}
                      CellNumber = {this.state.NumberArray[i]}
                      CellTopWidth = {3}
                      onCellSelect = {this.onCellSelect}
                      ref={ref => this.cells[i] = ref}
                      initFixed = {this.state.initFixArray[i]}
                      unselectable = {this.state.unselectableArray[i]}
                     />
            }else if ( i % this.state.size == 0){
              return <
                      CellLynor key={i} index={i}
                      cellNumberPerRow= {this.state.size}
                      CellNumber = {this.state.NumberArray[i]}
                      CellRightWidth = {3}
                      onCellSelect = {this.onCellSelect}
                      ref={ref => this.cells[i] = ref}
                      initFixed = {this.state.initFixArray[i]}
                      unselectable = {this.state.unselectableArray[i]}
                     />
            }else if ( i % this.state.size == 1){
              return <
                      CellLynor key={i} index={i}
                      cellNumberPerRow= {this.state.size}
                      CellNumber = {this.state.NumberArray[i]}
                      CellLeftWidth = {3}
                      onCellSelect = {this.onCellSelect}
                      ref={ref => this.cells[i] = ref}
                      initFixed = {this.state.initFixArray[i]}
                      unselectable = {this.state.unselectableArray[i]}
                     />
            }else{
              return <
                      CellLynor key={i} index={i}
                      cellNumberPerRow= {this.state.size}
                      CellNumber = {this.state.NumberArray[i]}
                      onCellSelect = {this.onCellSelect}
                      ref={ref => this.cells[i] = ref}
                      initFixed = {this.state.initFixArray[i]}
                      unselectable = {this.state.unselectableArray[i]}
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
                             name='arrow-circle-left'
                             color='white'
                             size={BoardWidth/8}/>
                   </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="black" onPress={this.onChecking}>
                   <View style = {styles.buttonContainer} >
                           <Icon
                             name='check-circle-o'
                             color='white'
                             size={BoardWidth/8}
                             style = {{position: 'absolute'}}/>
                           <Text style = {styles.checkCounter}>{this.state.checkCounter}</Text>
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
    marginTop: 2,
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
  },
  checkCounter: {
    position: 'absolute',
    right: 2,
    bottom: 0,
    color: 'white',
    fontWeight: 'bold',
    fontSize: BoardWidth/20,
  }
})

export default BoardLynor;
