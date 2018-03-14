import React from 'react';
import { ListView, Text, View, StyleSheet, Dimensions, Button } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Constants } from 'expo';

import { ChallengeScreen } from './Screens/ChallengeScreen.js';
import { HomeScreen } from './Screens/HomeScreen.js';
import { MorningScreen } from './Screens/MorningScreen.js';
import { PersonalScreen } from './Screens/PersonalScreen.js';
import { ProgressScreen } from './Screens/ProgressScreen.js';
import { SettingsScreen } from './Screens/SettingsScreen.js';
import { SummaryScreen } from './Screens/SummaryScreen.js';

const SleepBetter = StackNavigator({
  Home: { screen: HomeScreen },
  Progress: { screen: ProgressScreen },
  Morning: { screen: MorningScreen},
  DailySummary: { screen: SummaryScreen },
  PersonalOverview: { screen: PersonalScreen},
  Settings: { screen: SettingsScreen },
  Challenges: { screen: ChallengeScreen }
},
{ initialRouteName: 'Home'}
);

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SleepBetter style={{ width: Dimensions.get("window").width }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#990000',
  }
})
