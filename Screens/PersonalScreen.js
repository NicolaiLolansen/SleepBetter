import React from 'react';
import { ListView, Text, View, StyleSheet, Dimensions, Button } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Constants } from 'expo';

export class PersonalScreen extends React.Component {
  static navigationOptions = {
    title: 'PersonalScreen',

  };
  render() {
    console.log("PersonalScreen state is: ")
    
    console.log(this.props.screenProps)
    return (
      <View style={styles.container}>
        <Text>This is the personal screen</Text>
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
