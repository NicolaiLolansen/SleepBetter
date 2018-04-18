import React from 'react';
import styleConstants from '../Styles/Global.js';
import {Text, TouchableHighlight, Image, StyleSheet, View, StackNavigator, Button } from 'react-native';
import {Platform} from 'react-native';

class NavigationBar extends React.Component {

  render() {

    function BackButton () {
        if (Platform.OS === 'ios') {
          return <Text> Go Back{"\n"}Swipe left {this.props.snavigation}</Text>
        }
        else {
          return <Image style={styles.icon} source={require('../images/icon/house.png')} />
        }
    }
    
    return (
      <View style={styles.container}>
      {this.props.title != "HomeScreen" && 
        <View style={styles.back}>
          <TouchableHighlight style={styles.touch} onPress={() => this.props.snavigation.navigate('Home')}>       
            <BackButton />
          </TouchableHighlight>
        </View>
      }
        <View style={styles.textContainer}>    
          <Text style={styles.header}>{this.props.title}</Text>  
        </View>

        <View style={styles.settings}>
          <TouchableHighlight style={styles.touch} onPress={() => this.props.snavigation.navigate('Settings')}>       
            <Image 
              style={styles.icon}
              source={require('../images/icon/settings.png')}
            />
          </TouchableHighlight>
        </View>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    paddingTop: 30,
    width: styleConstants.deviceWidth,
    marginLeft: -10,
    backgroundColor: styleConstants.themeBlue,
    position: 'relative',
  },
  textContainer: {
    flex: 1,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
  },
  settings: {
    height: 25,
    position: 'absolute',
    right: 20,
    top: 40
  },
  back: {
    // display: isIOS ? 'None'
    height: 25,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 20,
    top: 40
  },
  icon: {
    height: 25,
    width: 25
  }
})

export default NavigationBar;
