import React from 'react';
import { Text, View, Image,StyleSheet} from 'react-native';
import styleConstants from '../Styles/Global.js';
import NavigationBar from '../Components/Navigation';

export class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title="Settings"
          snavigation = {this.props.navigation}
        />
      
        <Image 
          style={styles.image}
          source={require('../images/marvel/settingsscreen.png')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: styleConstants.deviceWidth - 20,
    resizeMode: 'contain',
  },
})
