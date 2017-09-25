'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Alert,
  Animated,
  Easing,
  Image,
} from 'react-native';

import Modal from 'react-native-modal';
import Button from 'react-native-flat-button';

import RecordPageComponent from './RecordPageComponent';
import {
  BoardWidth,
} from './GlobalStyle';

class RecordModalComponent extends Component {
  constructor(props) {
    super(props);
    this.props.navi.navigate=this.props.navi.navigate.bind(this);
    this.state = {
      visibleModal: null,
      elapsedTime: '',
      animation: new Animated.Value(0),
    };
  }


 componentWillReceiveProps(nextProps){
   if (this.props.elapsedTime !== nextProps.elapsedTime){
       let item = nextProps.elapsedTime;
       let hour = Math.floor(item / 60 / 60);
       let minute = Math.floor(item / 60 - hour * 60);
       let second = item % 60;
       item =  [hour, minute, second].map(x => x < 10 ? '0' + x : x).join(':');
       this.setState({
         elapsedTime: item,
       });

   }
 }


  _renderModalContent = () => (

    <View style={styles.modalContent}>
      <RecordPageComponent />
      <View style={{justifyContent: 'flex-end',flex: 1,alignItems: 'center'}}>
           <Animated.Image
               style={{
                         width: this.state.animation.interpolate({
                           inputRange:[0,1],
                           outputRange:[BoardWidth,BoardWidth*3/30]
                         }),
                         height: this.state.animation.interpolate({
                           inputRange:[0,1],
                           outputRange:[BoardWidth,BoardWidth*3/30]
                         }),
                         opacity: this.state.animation,
                         transform: [{
                             translateY: this.state.animation.interpolate({
                                  inputRange:[0,1],
                                  outputRange:[-BoardWidth,0]
                              })},
                            {rotateZ:this.state.animation.interpolate({
                                  inputRange:[0,1],
                                  outputRange:['0deg','360deg']
                            })}
                         ]
                      }}
               source={require('../image/flower.png')}
           />
          <Text style={styles.text}>
          </Text>
          <Button
            type="primary"
            containerStyle={styles.buttonContainer}
            onPress={() => {this.setState({ visibleModal: null }),
                            this.props.navi.navigate('Home')}}
            contentStyle={{ fontSize: BoardWidth*3/45, fontWeight: 'bold' }}
          >
            Back to Menu
          </Button>
        </View>
    </View>
  )

  onGameFinished = () => {
    this.setState({
      visibleModal: 2,
    });
    Animated.timing(this.state.animation,{
            toValue: 1,
            duration: 2500,
            easing: Easing.linear
    }).start();
  }

  render () {
    return (
      <View>
          <Modal
                  isVisible={this.state.visibleModal === 2}
                  animationIn={'slideInLeft'}
                  animationOut={'slideOutRight'}>
            {this._renderModalContent()}
          </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    alignItems: 'center',
    width: BoardWidth*2/3,
    height: BoardWidth*2/12,
    marginVertical: 5
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#90daed',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    paddingBottom: 22,
  },
  text:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: BoardWidth*3/42,
  },
})
export default RecordModalComponent;
