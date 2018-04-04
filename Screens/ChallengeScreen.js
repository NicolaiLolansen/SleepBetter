import React from 'react';
import { ListView, Text, View, StyleSheet, Dimensions, Button } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Constants } from 'expo';
import NavigationBar from '../Components/Navigation';

export class ChallengeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title="ChallengeScreen"
          snavigation = {this.props.navigation}
        />
        <Text>This is the Challenge Screen</Text>
        <Button
          title="Go to ProgressOverview"
          onPress={() => this.props.navigation.navigate('Progress')}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  }
})
