import React from 'react';
import { Text, View, Image,StyleSheet} from 'react-native';
import styleConstants from '../Styles/Global.js';
import NavigationBar from '../Components/Navigation';

export class ProgressScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title="Progress overview"
          snavigation = {this.props.navigation}
        />
      
        <Image 
          style={styles.image}
          source={require('../images/marvel/progressscreen.png')}
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
