import React from 'react';
import styleConstants from '../Styles/Global.js';
import {Text, TouchableOpacity, StyleSheet, View, StackNavigator, Button } from 'react-native';

class NavigationBar extends React.Component {

  render() {
    
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>    
          <Text style={styles.header}>{this.props.title}</Text>  
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
  }
})

export default NavigationBar;
