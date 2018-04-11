import React from 'react';
import { ListView, Text, View, StyleSheet, Dimensions, Image, Button,TouchableHighlight } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { StackNavigator} from 'react-navigation';
import { Constants } from 'expo';
import styleConstants from '../Styles/Global.js';
import NavigationBar from '../Components/Navigation';
import AutoHeightImage from 'react-native-auto-height-image';

export class MorningScreen extends React.Component {
  static navigationOptions = {
    title: 'MorningScreen',

  };

  constructor () {
    super();
    this.state = {
      question:false,
      checked0: false,
      checked1: false,
      checked2: false,
      checked3: false, 
    };
 } 
 
 showQuestions = () => {
    this.setState({question:true});
 }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title="Daily summary"
          snavigation = {this.props.navigation}
        />
        
        {!this.state.question && 
        <View> 
          <TouchableHighlight onPress={() => this.props.navigation.navigate('DailySummary')}>       
            <AutoHeightImage 
              style={styles.image}
              width={styleConstants.deviceWidth-20}
              source={require('../images/marvel/morning_screen1.png')}
            />
          </TouchableHighlight>

          <TouchableHighlight style={styles.progress} onPress={() => this.showQuestions() } >       
            <AutoHeightImage 
              style={styles.image}
              width={styleConstants.deviceWidth-20}
              source={require('../images/marvel/letsgo.png')}
            />
          </TouchableHighlight>
        </View> }

        {this.state.question && 
        <View> 
          
          <View style={styles.morningMessage}> 
            <AutoHeightImage 
              style={styles.image2}
              width={styleConstants.deviceWidth*0.3-20}
              source={require('../images/marvel/logo.png')}
            />
            <Text style={styles.text}>Which of the following statements are true, 1 hour before you sleep?</Text>

          </View>

          <CheckBox
              center
              title='Had coffee'
              containerStyle={!this.state.checked0 ? styles.checkboxesN : styles.checkboxesG }
              textStyle={styles.checkboxesText}
              checkedIcon=''
              uncheckedIcon=''
              checked={this.state.checked0}
              onPress={() => this.setState({
                checked0: !this.state.checked0
                })
              }
            />
            <CheckBox
              center
              title='Ate a big meal'
              containerStyle={!this.state.checked1 ? styles.checkboxesN : styles.checkboxesG }
              textStyle={styles.checkboxesText}
              checkedIcon=''
              uncheckedIcon=''
              checked={this.state.checked1}
              onPress={() => this.setState({
                checked1: !this.state.checked1
                })
              }
            />
            <CheckBox
              center
              title='Exercised'
              containerStyle={!this.state.checked2 ? styles.checkboxesN : styles.checkboxesG }
              textStyle={styles.checkboxesText}
              checkedIcon=''
              uncheckedIcon=''
              checked={this.state.checked2}
              onPress={() => this.setState({
                checked2: !this.state.checked2
                })
              }
            />
            <CheckBox
              center
              title='Did some yoga'
              containerStyle={!this.state.checked3 ? styles.checkboxesN : styles.checkboxesG }
              textStyle={styles.checkboxesText}
              checkedIcon=''
              uncheckedIcon=''
              checked={this.state.checked3}
              onPress={() => this.setState({
                checked3: !this.state.checked3
                })
              }
            />
          <TouchableHighlight style={styles.progress} onPress={() => this.props.navigation.navigate('DailySummary')} >       
            <AutoHeightImage 
              style={styles.image}
              width={styleConstants.deviceWidth-20}
              source={require('../images/marvel/letsgo.png')}
            />
          </TouchableHighlight>
        </View> }
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    paddingTop:10,
    marginBottom:30,
    resizeMode: 'contain',
  },
  image2: {
    paddingTop:10,
    marginBottom:30,
    marginTop: 30,
    resizeMode: 'contain',
  },
  morningMessage: {
    width: styleConstants.deviceWidth - 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems : 'center',
  },
  text: {
    fontSize: 20,
    marginLeft: 20,
    width: styleConstants.deviceWidth *0.7 - 20,
  },
  checkboxesN: {
    backgroundColor: 'rgba(235,235,235,0.43)',
    height: 60,
  },
  checkboxesG: {
    backgroundColor: 'rgba(119,211,83,0.63)',
    height: 60,
  },
  checkboxesText: {
    color: "#5A6978",
    fontSize: 24,
  },
})
