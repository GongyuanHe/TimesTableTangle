'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
} from 'react-native';

import Modal from 'react-native-modal';
import Button from 'react-native-flat-button';


import {
  BoardWidth,
} from './GlobalStyle';

class GameFailedComponent extends Component {
  constructor(props) {
    super(props);
    this.props.navi.navigate=this.props.navi.navigate.bind(this);
    this.state = {
      visibleModal: null,
    };
  }




  _renderModalContent = () => (

    <View style={styles.modalContent}>

      <View style={{alignItems: 'center'}}>
          <Text style={styles.text}>
                Don‘t give up!
          </Text>
          <Image
            style={{width: BoardWidth/2, height: BoardWidth/2}}
            source={require('../image/face.png')}
          />
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

  onGameFailed = () => {
    this.setState({
      visibleModal: 2,
    });
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
    paddingBottom: 20,
  },
})
export default GameFailedComponent;
