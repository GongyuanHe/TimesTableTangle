import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Alert,
} from 'react-native';

import Button from 'react-native-flat-button';
import ModalDropdown from 'react-native-modal-dropdown';
import { SegmentedControls } from 'react-native-radio-buttons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

import {
  BoardWidth,
} from './GlobalStyle';

const DEMO_OPTIONS_2 = ['1','2','3'];
const smallsize = 7;
const largesize = 10;

class SettingScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigation.navigate=this.props.navigation.navigate.bind(this);
    this.state = {
      selectedOption: 'Small Grid',
      selectedOption1: 'QuickGame',
      selectedSize: smallsize,
      selectedModel: 0,
      dropdownValue : '',
      gameLevel: '',
      visibleModal: null,
    };
  }


  static navigationOptions = {
    title: 'Settings',
    header: null
  };

  _renderButton = (text) => (
    <Button
      type="primary"
      containerStyle={styles.buttonContainer}
      onPress={() => this.setState({ visibleModal: null })}
      contentStyle={{ fontSize: BoardWidth*3/45, fontWeight: 'bold' }}
      >
      {text}
    </Button>
  );

  _renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text style={styles.modalText}> Pick a level !</Text>
      {this._renderButton('Close')}
    </View>
  );

  handleLevel(idx,value){
    this.setState({
      gameLevel: value,
    });
  }

  handleStart = () => {
    if (this.state.gameLevel==''){
       this.setState({
         visibleModal: 2,
       });
    }else{
      this.props.navigation.navigate('Game',{ size: this.state.selectedSize, level: this.state.gameLevel, model: this.state.selectedModel })
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    const options1 = [
         "Small Grid",
         "Large Grid"
    ];
    const options2 = [
         "QuickGame",
         "FullGame"
    ];

    function setSelectedOption(selectedOption){
          this.setState({
              selectedOption
          });
          if(selectedOption=='Large Grid'){
            this.setState({
                selectedSize: largesize
            });
          }else if (selectedOption=='Small Grid'){
            this.setState({
                selectedSize: smallsize
            });
          }
    }
    function setSelectedOption1(selectedOption1){
          this.setState({
              selectedOption1
          });
          if(selectedOption1=='QuickGame'){
            this.setState({
                selectedModel: 0,
            });
          }else if (selectedOption1=='FullGame'){
            this.setState({
                selectedModel: 1,
            });
          }
    }
    return (
    <View style={styles.container}>
        <Modal
                isVisible={this.state.visibleModal === 2}
                animationIn={'slideInLeft'}
                animationOut={'slideOutRight'}
        >
          {this._renderModalContent()}
        </Modal>
        <View style = {{flex: 2, justifyContent: 'center'}}>
          <Icon style = {{paddingLeft: 20}}
              name='arrow-circle-left'
              size={BoardWidth/8}
              color='#3498db'
              onPress={() => navigate('Home')}/>
        </View>
        <View style={{flex: 8, justifyContent: 'center',alignItems: 'center'}}>
            <View style = {{paddingBottom: 20}}>
                <SegmentedControls
                       options={ options1 }
                       tint={'#3498db'}
                       optionStyle={{fontWeight: 'bold',fontSize: BoardWidth*3/50}}
                       containerStyle={{width: BoardWidth*4/5}}
                       onSelection={ setSelectedOption.bind(this) }
                       selectedOption={this.state.selectedOption }/>
            </View>
            <View style = {{paddingBottom: 20}}>
                <SegmentedControls
                       options={ options2 }
                       tint={'#3498db'}
                       optionStyle={{fontWeight: 'bold',fontSize: BoardWidth*3/50}}
                       containerStyle={{width: BoardWidth*4/5}}
                       onSelection={ setSelectedOption1.bind(this) }
                       selectedOption={this.state.selectedOption1 }/>
            </View>
            <View style = {{paddingBottom: 50}}>
                <ModalDropdown style={styles.dropdown_2}
                               defaultValue='Game Level'
                               textStyle={styles.dropdown_2_text}
                               dropdownStyle={styles.dropdown_2_dropdown}
                               options={DEMO_OPTIONS_2}
                               onSelect={(idx, value) => this.handleLevel(idx, value)}
                               renderRow={this._renderRow.bind(this)}
                               renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this._dropdown_2_renderSeparator(sectionID, rowID, adjacentRowHighlighted)}/>
            </View>
            <Button
              type="primary"
              containerStyle={styles.buttonContainer}
              onPress={this.handleStart}
              contentStyle={{ fontSize: BoardWidth*3/45, fontWeight: 'bold' }}>
              Start
            </Button>
        </View>
    </View>
    );
  }

  _renderRow(rowData, rowID, highlighted) {
    let evenRow = rowID % 2;
    return (
      <TouchableHighlight underlayColor='cornflowerblue'>
        <View style={[styles.dropdown_2_row, {alignItems: 'center',backgroundColor: evenRow ? 'lemonchiffon' : 'white'}]}>
            <View>
              <Text style={[styles.dropdown_2_row_text, highlighted && {color: 'mediumaquamarine'}]}>
                {`${rowData}`}
              </Text>
            </View>
        </View>
      </TouchableHighlight>
    );
  }

  _dropdown_2_renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    let key = `spr_${rowID}`;
    return (<View style={styles.dropdown_2_separator}
                  key={key}
    />);
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90daed',

  },
  dropdown_2: {
    alignSelf: 'center',
    width: BoardWidth*2/3,
    height: BoardWidth*2/12,
    borderRadius: 8,
    borderBottomWidth: 4,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: '#2980b9',
    backgroundColor: '#3498db',

  },
  dropdown_2_text: {
    marginVertical: 10,
    marginHorizontal: 6,
    fontSize: BoardWidth*3/45,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  dropdown_2_dropdown: {
    width: BoardWidth*2/3,
    height: 126,
    borderColor: 'cornflowerblue',
    borderWidth: 2,
    borderRadius: 3,
  },
  dropdown_2_row: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdown_2_row_text: {
    marginHorizontal: 4,
    fontSize: 16,
    color: 'navy',
    textAlignVertical: 'center',
    fontWeight: 'bold',

  },
  dropdown_2_separator: {
    height: 1,
    backgroundColor: 'cornflowerblue',
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
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
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
  }
})

export default SettingScreen;
