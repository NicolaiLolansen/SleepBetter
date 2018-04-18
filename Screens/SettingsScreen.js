import React from 'react';
import { Text, View, Image,StyleSheet, TouchableHighlight} from 'react-native';
import styleConstants from '../Styles/Global.js';
import NavigationBar from '../Components/Navigation';
import AutoHeightImage from 'react-native-auto-height-image';

export class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title="Settings"
          snavigation = {this.props.navigation}
        />
      
        <AutoHeightImage 
          style={styles.image}
          width={styleConstants.deviceWidth - 20}
          source={require('../images/marvel/settingsscreen.png')}
        />

        <TouchableHighlight style={styles.progress} onPress={() => alert("You don't need this :) !")} >
            <AutoHeightImage
              style={styles.image}
              width={styleConstants.deviceWidth-20}
              source={require('../images/marvel/syncdevice.png')}
            />
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:0,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: styleConstants.deviceWidth - 20,
    resizeMode: 'contain',
    marginTop:20,
    marginBottom:40,
  },
})
