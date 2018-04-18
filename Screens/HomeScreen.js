import React from 'react';
import { ListView, Text, View, StyleSheet, Dimensions, Image, Button,TouchableHighlight } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Constants } from 'expo';
import styleConstants from '../Styles/Global.js';
import NavigationBar from '../Components/Navigation';

import AutoHeightImage from 'react-native-auto-height-image';

export class HomeScreen extends React.Component {

  constructor () {
      super();
      this.state = {
        answered_today: "",
      };

 }


 componentWillMount(){
     console.log("HomeScreen state props")
     console.log(this.state)
     if(this.props.navigation.state.params){
         if(this.props.navigation.state.params.answered_today){
             this.setState({answered_today: true})
         }
     }

     if(this.props.screenProps.answered_today){
         this.setState({answered_today: true})
         console.log("SETTING STATE IN HOMESCREEN");
         console.log(this.props.screenProps.answered_today)
         console.log(this.state);
     }
 }

  render() {


    return (

      <View style={styles.container}>
        <NavigationBar
          title="HomeScreen"
          snavigation = {this.props.navigation}
        />

        <TouchableHighlight onPress={() => this.props.navigation.navigate('Morning',{answered_today: this.state.answered_today})}>
          <AutoHeightImage
            style={styles.image}
            width={styleConstants.deviceWidth-20}
            source={require('../images/marvel/front_calendar.png')}
           />
        </TouchableHighlight>

        <TouchableHighlight style={styles.progress} onPress={() => this.props.navigation.navigate('Progress',{answered_today: this.state.answered_today})}>
          <AutoHeightImage
            style={styles.image}
            width={styleConstants.deviceWidth-20}
            source={require('../images/marvel/front_progress.png')}
           />
        </TouchableHighlight>

        <View style={styles.sidebyside}>

          <View style={styles.achievements}>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('Challenges',{answered_today: this.state.answered_today})}>
              <AutoHeightImage
                style={styles.imagehalf}
                width={styleConstants.deviceWidth * 0.5 - 10}
                source={require('../images/marvel/front_achievements.png')}
              />
            </TouchableHighlight>
          </View>

          <View style={styles.personal}>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('PersonalOverview')}>
              <AutoHeightImage
                style={styles.imagehalf}
                width={styleConstants.deviceWidth * 0.5 - 10}
                source={require('../images/marvel/front_personal.png')}
              />
            </TouchableHighlight>
          </View>

        </View>

      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
  },
  image: {
    width: styleConstants.deviceWidth - 20,
    resizeMode: 'contain',
    marginTop: 5,
    marginBottom: 5,
    padding: 20,
  },
  progress: {
    marginTop: 0,
  },
  sidebyside: {
    width: styleConstants.deviceWidth - 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 0,
    marginBottom: 50,
  },
  achievements: {
    width: styleConstants.deviceWidth * 0.5 - 10,

  },
  personal:{
    width: styleConstants.deviceWidth * 0.5 - 10,
  }
})
