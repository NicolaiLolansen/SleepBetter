import React from 'react';
import { Text, View, Image,StyleSheet} from 'react-native';
import styleConstants from '../Styles/Global.js';
import NavigationBar from '../Components/Navigation';
import AutoHeightImage from 'react-native-auto-height-image';

export class ChallengeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title="Progress overview"
          snavigation = {this.props.navigation}
        />
      
        <AutoHeightImage 
          style={styles.image}
          width={styleConstants.deviceWidth}
          source={require('../images/marvel/achievementsscreen.png')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    backgroundColor: '#f1f4f0',
  },
  image: {
    width: styleConstants.deviceWidth - 20,
    resizeMode: 'contain',
  },
})
