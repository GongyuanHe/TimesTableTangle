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

import CheckPageComponent from '../components/CheckPageComponent';
import {
  BoardWidth,
} from './GlobalStyle';

class CheckModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleModal: null,
      record: '',
    };
  }

  _renderModalContent = () => (

    <View style={styles.modalContent}>
      <CheckPageComponent data={this.state.record}/>
      <View style={{justifyContent: 'flex-end',flex: 1,alignItems: 'center'}}>
          <Button
            type="primary"
            containerStyle={styles.buttonContainer}
            onPress={() => {this.setState({ visibleModal: null })}}
            contentStyle={{ fontSize: BoardWidth*3/45, fontWeight: 'bold' }}
          >
            Back
          </Button>
        </View>
    </View>
  )

  onChecked = (record) => {
    this.setState({
      visibleModal: 2,
      record: record,
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
export default CheckModalComponent;
