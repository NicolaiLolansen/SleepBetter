import React from 'react';
import { ListView, Text, View, StyleSheet, Dimensions, Image, Button,TouchableHighlight } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Constants } from 'expo';
import styleConstants from '../Styles/Global.js';
import NavigationBar from '../Components/Navigation';

import AutoHeightImage from 'react-native-auto-height-image';
import {ENDPOINT} from '../App.js';

export class HomeScreen extends React.Component {

  constructor () {
      super();
      this.state = {
        answered_today: false,
      };

 }


 async componentWillMount() {

     var token = this.props.screenProps.token;
     url = ENDPOINT + "/getstate/"+token
     fetch(url)
     .then((response) => response.json())
     .then((responseJson) => {
         console.log("HANDLED LOGIN")


         if(responseJson.state){

             console.log("getState - State")
             console.log(responseJson.state)
             var questions = responseJson.state.questions;

             var current_day = new Date();
             var answered_today = false;
             if(questions){
                 for(var i = 0; i < questions.length; i++){
                     var day = questions[i].answered;
                     day = String(day).replace("Z","")
                     date = String(day).split('T');

                     var days = String(date[0]).replace("\"","").split('-');
                     var hours = String(date[1]).replace("\"","").split(':');
                     var day_answered = new Date(...[parseInt(days[0]),parseInt(days[1])-1,parseInt(days[2]),
                                                     parseInt(hours[0]),parseInt(hours[1]),parseInt(hours[2])]);

                     console.log(day_answered)
                     console.log(current_day)
                     if(day_answered.getFullYear() === current_day.getFullYear() &&
                        day_answered.getMonth() === current_day.getMonth() &&
                        day_answered.getDate() === current_day.getDate()){
                            answered_today = true;
                        }
                 }
             }
             this.setState({answered_today:answered_today})

         }
 })
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
