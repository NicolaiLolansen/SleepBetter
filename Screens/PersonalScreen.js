import React from 'react';
import { ListView, Text, View, StyleSheet, Dimensions, Button } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Constants } from 'expo';
import NavigationBar from '../Components/Navigation';
import styleConstants from '../Styles/Global.js';
import AutoHeightImage from 'react-native-auto-height-image';

export class PersonalScreen extends React.Component {
  static navigationOptions = {
    title: 'PersonalScreen',

  };


  render() {
    console.log("PersonalScreen state is: ")
    console.log(this.props.screenProps)
    return (
      <View style={styles.container}>
        <NavigationBar
          title="Personal Overview"
          snavigation = {this.props.navigation}
        />

        <AutoHeightImage
          style={styles.image}
          width={styleConstants.deviceWidth-18}
          source={require('../images/marvel/personal_overview.png')}
        />
      </View>

    )
  }
}
// <Button
//           title="Go to ProgressOverview"
//           onPress={() => this.props.navigation.navigate('Progress')}
//         />

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingTop: Constants.statusBarHeight,
//     backgroundColor: '#fff',
//   }
// })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    backgroundColor: styleConstants.themeBlue,
  },
  image: {
    width: styleConstants.deviceWidth-18,
    resizeMode: 'contain',
  },
})
