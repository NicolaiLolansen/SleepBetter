import React from 'react';
import { ListView, Text, View, StyleSheet, Dimensions, Image, Button,TouchableHighlight } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Constants } from 'expo';

export class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'HomeScreen',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>This is the home screen</Text>
        <Button
          title="Go to ProgressOverview"
          onPress={() => this.props.navigation.navigate('Progress')}
        />
        <TouchableHighlight onPress={() => this.props.navigation.navigate('Morning')}>
        
          <Image 
            style={styles.button}
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
          title="Go to MorningScreen"
          onPress={() => this.props.navigation.navigate('Morning')}
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
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
  button: {

  }
})
