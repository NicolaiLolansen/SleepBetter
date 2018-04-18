import React from 'react';
import { ListView, Text, View, StyleSheet, Dimensions, Image, Button,TouchableHighlight } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Constants } from 'expo';
import styleConstants from '../Styles/Global.js';
import NavigationBar from '../Components/Navigation';
import AutoHeightImage from 'react-native-auto-height-image';

export class SummaryScreen extends React.Component {
  static navigationOptions = {
    title: 'SummaryScreen',

  };

  constructor () {
    super();
    var answered_today = true;
    this.state = {
      loading: false,
      question:false,
      checked0: false,
      checked1: false,
      checked2: false,
      checked3: false,
      checked4: false,
      checked5: false,
      rateSleep: 5,
      answered_today: answered_today
    };
 }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title="Daily summary"
          snavigation = {this.props.navigation}
        />

        <TouchableHighlight onPress={() => this.props.navigation.navigate('DailySummary',{answered_today:this.state.answered_today})}>
          <AutoHeightImage
            style={styles.image}
            width={styleConstants.deviceWidth-20}
            source={require('../images/marvel/daily_summary.png')}
           />
        </TouchableHighlight>

        <TouchableHighlight style={styles.progress} onPress={() => this.props.navigation.navigate('Home',{answered_today:this.state.answered_today})}>
          <AutoHeightImage
            style={styles.image}
            width={styleConstants.deviceWidth-20}
            source={require('../images/marvel/done.png')}
           />
        </TouchableHighlight>
      </View>
    )
  }
}

      // <View style={styles.container}>
      //   <Text>This is the Summary screen</Text>
      //   <Button
      //     title="Go to ProgressOverview"
      //     onPress={() => this.props.navigation.navigate('Progress')}
      //   />
      // </View>

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
    width: styleConstants.deviceWidth - 20,
    resizeMode: 'contain',
  },
})
