import React from 'react';
import { ListView, Text, View, StyleSheet, Dimensions, Image, Button,TouchableHighlight } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Constants } from 'expo';
import styleConstants from '../Styles/Global.js';
import NavigationBar from '../Components/Navigation';

export class HomeScreen extends React.Component {

  render() {
    return (

      <View style={styles.container}>
        <NavigationBar
          title="HomeScreen"
          snavigation = {this.props.navigation}
        />
        
        <TouchableHighlight onPress={() => this.props.navigation.navigate('DailySummary')}>       
          <Image 
            style={styles.image}
            source={require('../images/marvel/front_calendar.png')}
           />
        </TouchableHighlight>

        <TouchableHighlight style={styles.progress} onPress={() => this.props.navigation.navigate('Progress')}>       
          <Image 
            style={styles.image}
            source={require('../images/marvel/front_progress.png')}
           />
        </TouchableHighlight>

        <View style={styles.sidebyside}>

          <View style={styles.achievements}>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('Challenges')}>       
              <Image 
                style={styles.imagehalf}
                source={require('../images/marvel/front_achievements.png')}
              />
            </TouchableHighlight>
          </View>

          <View style={styles.personal}>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('PersonalOverview')}>       
              <Image 
                style={styles.imagehalf}
                source={require('../images/marvel/front_personal.png')}
              />
            </TouchableHighlight>
          </View>

        </View>

        <Button
          title="Go to SummaryScreen"
          onPress={() => this.props.navigation.navigate('Morning')}
        />
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
    margin: 0,
    padding: 0,
  },
  progress: {
    marginTop: -15,
  },
  sidebyside: {
    width: styleConstants.deviceWidth - 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: -10,
  },
  achievements: {
    width: styleConstants.deviceWidth * 0.5 - 10,
    
  },
  personal:{
    width: styleConstants.deviceWidth * 0.5 - 10,
  }
})
