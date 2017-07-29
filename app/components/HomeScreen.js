import React, { Component } from 'react';
import { StyleSheet,  View, Image ,AsyncStorage} from 'react-native';


import Button from 'react-native-flat-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

import RecordPageComponent from './RecordPageComponent';
import {
  BoardWidth,
} from './GlobalStyle';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleModal: null,
    };
  }

  static navigationOptions = {
    title: 'Welcome',
    header: null
  };

  _renderModalContent = () => (

    <View style={styles.modalContent}>
      <RecordPageComponent />
      <View style={{justifyContent: 'flex-end',flex: 2}}>
          <Button
            type="primary"
            containerStyle={styles.buttonContainer}
            onPress={() => {this.setState({ visibleModal: null })}}
            contentStyle={{ fontSize: BoardWidth*3/45, fontWeight: 'bold' }}
          >
            Back to Menu
          </Button>

        </View>
    </View>
  )

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
         <View style={{flex: 6,justifyContent: 'center', alignItems: 'center'}}>
             <Image
               style={{width: BoardWidth*4/5, height: BoardWidth*328/1500}}
               source={require('../image/logo.png')}
             />
         </View>

          <View style={{flex: 4,justifyContent: 'center', alignItems: 'center'}}>

              <Button
              type="primary"
              containerStyle={styles.buttonContainer}
              onPress={() => navigate('Setting')}
              contentStyle={{ fontSize: BoardWidth*3/45, fontWeight: 'bold' }}>
              New Game
              </Button>

              <Button
              type="primary"
              containerStyle={styles.buttonContainer}
              onPress={ () => this.setState({visibleModal: 2})}
              contentStyle={{ fontSize: BoardWidth*3/45, fontWeight: 'bold' }}>
              High Scores
              </Button>


          </View>
          <View>
              <Modal
                      isVisible={this.state.visibleModal === 2}
                      animationIn={'slideInLeft'}
                      animationOut={'slideOutRight'}>
                {this._renderModalContent()}
              </Modal>
          </View>

      </View>

    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90daed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: BoardWidth*2/3,
    height: BoardWidth*2/12,
    marginVertical: 5
  },
  content:{
    fontSize: 22
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
});

export default HomeScreen;
