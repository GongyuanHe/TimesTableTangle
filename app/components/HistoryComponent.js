import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  TouchableHighlight,
  Alert,
} from 'react-native';

import CheckModalComponent from '../components/CheckModalComponent';
import {
  BoardWidth,
} from './GlobalStyle';

class HistoryComponent extends Component {
records=[];
  constructor(props) {
    super(props);
    this.state = {
      HistoryRecord: [],
    };
  }

  async componentDidMount () {

      let value = await AsyncStorage.getItem('history');
      if (value !== null ){
          value = JSON.parse(value);
          value.forEach(function(currentValue,index){
                value[index]=currentValue.split('|');
                for(let i = 0 ; i < 13 ; i ++){
                      if(i==0){
                          if(value[index][i]<10){
                              value[index][i]='0'+value[index][i]+'X'+'0'+value[index][i];
                          }else{
                              value[index][i]=value[index][i]+'X'+value[index][i];
                          }
                      }else if (i==1) {
                            value[index][i]= value[index][i]+ 'sec';
                      }else if (i==2) {
                            value[index][i]= Math.floor(value[index][i]*100) + '%';
                      }else if (i==6) {
                            value[index][i]=value[index][i].split(',');
                      }else if (i==7) {
                            value[index][i]=value[index][i].split(',');
                      }else if (i==8) {
                            value[index][i]=value[index][i].split(',');
                      }else if (i==9) {
                            value[index][i]=value[index][i].split('-');
                      }else if (i==10) {
                            value[index][i]=value[index][i].split('-');
                      }else if (i==11) {
                            value[index][i]=value[index][i].split('-');
                      }
                }
          })
          this.setState({
            HistoryRecord: value,
          });
      }

  }
  onShow = (i) =>{
    this.CheckModal.onChecked(this.state.HistoryRecord[i-1]);
  }
  render () {

      if (this.state.HistoryRecord==''){
            return (<View style={styles.defaultContainer}><Text style={styles.defaultText}>No record!</Text></View>);
      }else{
        let len = this.state.HistoryRecord.length;
        let i;
        let item = [];
        if (len <= 20){
            for (i=len;i>0;i--){
              let currentIndex=i;
              item.push(<View key={i}>
                          <TouchableHighlight underlayColor="black"
                                              onPress={()=> this.onShow(currentIndex)}>
                            <View key={i+'_row'} style={styles.rowText}>
                                <Text key={i+'_3'} style={[{width: BoardWidth/3.5},styles.text]}>{this.state.HistoryRecord[i-1][3]}</Text>
                                <Text key={i+'_0'} style={[{width: BoardWidth/5.5},styles.text]}>{this.state.HistoryRecord[i-1][0]}</Text>
                                <Text key={i+'_1'} style={[{width: BoardWidth/5.5},styles.text]}>{this.state.HistoryRecord[i-1][1]}</Text>
                                <Text key={i+'_2'} style={[{width: BoardWidth/5.5},styles.text]}>{this.state.HistoryRecord[i-1][2]}</Text>
                            </View>
                          </TouchableHighlight>
                        </View>);
            }
        }else{
            for(i=len;i>len-20;i--){
              let currentIndex=i;
              item.push(<View key={i}>
                          <TouchableHighlight underlayColor="black"
                                              onPress={()=> this.onShow(currentIndex)}>
                            <View key={i+'_row'} style={styles.rowText}>
                                <Text key={i+'_3'} style={[{width: BoardWidth/3.5},styles.text]}>{this.state.HistoryRecord[i-1][3]}</Text>
                                <Text key={i+'_0'} style={[{width: BoardWidth/5.5},styles.text]}>{this.state.HistoryRecord[i-1][0]}</Text>
                                <Text key={i+'_1'} style={[{width: BoardWidth/5.5},styles.text]}>{this.state.HistoryRecord[i-1][1]}</Text>
                                <Text key={i+'_2'} style={[{width: BoardWidth/5.5},styles.text]}>{this.state.HistoryRecord[i-1][2]}</Text>
                            </View>
                          </TouchableHighlight>
                        </View>);
            }
        }
        return (
            <View style={styles.container}>
                {item}
                <CheckModalComponent ref={ref => this.CheckModal = ref}/>
            </View>

        )
      }


      }
}

const styles = StyleSheet.create({
  defaultContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container:{
    justifyContent: 'center',
  },
  rowText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: BoardWidth*3/80,
  },
  date: {
    alignItems: 'center',
  },
  defaultText:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: BoardWidth*3/42,
  },
});


export default HistoryComponent;
