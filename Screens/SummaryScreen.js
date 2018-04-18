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
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title="Daily summary"
          snavigation = {this.props.navigation}
        />
        
        <TouchableHighlight onPress={() => this.props.navigation.navigate('DailySummary')}>       
          <AutoHeightImage 
            style={styles.image}
            width={styleConstants.deviceWidth-20}
            source={require('../images/marvel/daily_summary.png')}
           />
        </TouchableHighlight>

        <TouchableHighlight style={styles.progress} onPress={() => this.props.navigation.navigate('Home')}>       
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
