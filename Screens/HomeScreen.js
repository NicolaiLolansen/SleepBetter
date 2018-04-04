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
        />
        <TouchableHighlight style={styles.touch} onPress={() => this.props.navigation.navigate('Morning')}>       
          <Image 
            style={styles.image}
            source={require('../images/marvel/front_calendar.png')}
           />
        </TouchableHighlight>

        <Button
          title="Go to ChallengeScreen"
          onPress={() => this.props.navigation.navigate('Challenges')}
        />
        <Button
          title="Go to PersonalScreen"
          onPress={() => this.props.navigation.navigate('PersonalOverview')}
        />
        <Button
          title="Go to ProgressOverview"
          onPress={() => this.props.navigation.navigate('Progress')}
        />
        <Button
          title="Go to SettingsScreen"
          onPress={() => this.props.navigation.navigate('Settings')}
        />
        <Button
          title="Go to SummaryScreen"
          onPress={() => this.props.navigation.navigate('DailySummary')}
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
    resizeMode: 'contain'
  },
  touch: {

  },
})
