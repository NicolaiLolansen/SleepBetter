import React from 'react';
import styleConstants from '../Styles/Global.js';
import {Text, TouchableHighlight, Image, StyleSheet, View, StackNavigator, Button } from 'react-native';

class NavigationBar extends React.Component {

  render() {
    
    return (
      <View style={styles.container}>
  
        <View style={styles.back}>
          <TouchableHighlight style={styles.touch} onPress={() => this.props.snavigation.navigate('Home')}>       
            <Image 
              style={styles.icon}
              source={require('../images/icon/back.png')}
            />
          </TouchableHighlight>
        </View>

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
    paddingTop: 20,
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
    height: 30,
    position: 'absolute',
    right: 20,
    top: 35
  },
  back: {
    height: 30,
    position: 'absolute',
    left: 20,
    top: 35
  },
  icon: {
    height: 30,
    width: 30
  }
})

export default NavigationBar;
