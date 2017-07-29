import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
} from 'react-native';

import {
  BoardWidth,
} from './GlobalStyle';

class HistoryComponent extends Component {

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
                for(let i = 0 ; i < 4 ; i ++){
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
                      }else {

                      }
                }
          })
          this.setState({
            HistoryRecord: value,
          });
      }

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
              item.push(<View key={i}>

                            <View key={i+'_row'} style={styles.rowText}>
                                <Text key={i+'_3'} style={styles.text}>{this.state.HistoryRecord[i-1][3]}</Text>
                                <Text key={i+'_0'} style={styles.text}>{this.state.HistoryRecord[i-1][0]}</Text>
                                <Text key={i+'_1'} style={styles.text}>{this.state.HistoryRecord[i-1][1]}</Text>
                                <Text key={i+'_2'} style={styles.text}>{this.state.HistoryRecord[i-1][2]}</Text>
                            </View>
                        </View>);
            }
        }else{
            for(i=len;i>len-20;i--){
              item.push(<View key={i}>
                            <View key={i+'_row'} style={styles.rowText}>
                                <Text key={i+'_3'} style={styles.text}>{this.state.HistoryRecord[i-1][3]}</Text>
                                <Text key={i+'_0'} style={styles.text}>{this.state.HistoryRecord[i-1][0]}</Text>
                                <Text key={i+'_1'} style={styles.text}>{this.state.HistoryRecord[i-1][1]}</Text>
                                <Text key={i+'_2'} style={styles.text}>{this.state.HistoryRecord[i-1][2]}</Text>
                            </View>
                        </View>);
            }
        }
        return (
          <View style={styles.container}>{item}</View>
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
