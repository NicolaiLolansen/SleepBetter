import React from 'react';
import { Text, View, Image,StyleSheet} from 'react-native';
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    paddingTop:5,
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
