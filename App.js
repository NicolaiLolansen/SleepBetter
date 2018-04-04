import React from 'react';
import { ListView, Text, TextInput, TouchableHighlight, View, StyleSheet, Dimensions, Button } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Constants } from 'expo';
import { ChallengeScreen } from './Screens/ChallengeScreen.js';
import { HomeScreen } from './Screens/HomeScreen.js';
import { MorningScreen } from './Screens/MorningScreen.js';
import { PersonalScreen } from './Screens/PersonalScreen.js';
import { ProgressScreen } from './Screens/ProgressScreen.js';
import { SettingsScreen } from './Screens/SettingsScreen.js';
import { SummaryScreen } from './Screens/SummaryScreen.js';
import { Permissions, Notifications } from 'expo';


//let PUSH_ENDPOINT = "http://192.168.43.75:8080/push";
//let PUSH_ENDPOINT = "http://s134859.ml:8080/push";
let ENDPOINT = "http://34.240.2.7:8080"
let PUSH_ENDPOINT = ENDPOINT+"/pushtoken";
let STATE_ENDPOINT = ENDPOINT+"/getstate"

const SleepBetter = StackNavigator({
  Home: { screen: HomeScreen},
  Progress: { screen: ProgressScreen },
  Morning: { screen: MorningScreen},
  DailySummary: { screen: SummaryScreen },
  PersonalOverview: { screen: PersonalScreen},
  Settings: { screen: SettingsScreen },
  Challenges: { screen: ChallengeScreen }
},
{ initialRouteName: 'Home'}
);

async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }
  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  console.log(token);
  return token;

}


export default class App extends React.Component {
constructor(){
    super();
    this.state = {
        token: "",
        notification: [],
        username: "",
    };
}

handleUsername =(text)=>{
    this.setState({ username: text })
}

ChangeTextFunction =()=>{

    (async() =>{
        let token = await registerForPushNotificationsAsync();
        console.log(token)

    this.setState({
        token: token
    })

    console.log(JSON.stringify(this.state));
    //alert('Token: ' + token + ' Username: ' + this.state.username)
    fetch(PUSH_ENDPOINT,{
    method: 'POST',
    headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
    },
    body: JSON.stringify(this.state),
})
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.success){
            alert(responseJson.success)
        }else{
            console.log(responseJson)
        }

      })
      .catch((error) =>{
        console.error(error);
      });

    })();
}


 componentDidMount() {
   registerForPushNotificationsAsync();

   // Handle notifications that are received or selected while the app
   // is open. If the app was closed and then opened by tapping the
   // notification (rather than just tapping the app icon to open it),
   // this function will fire on the next tick after the app starts
   // with the notification data.
   this._notificationSubscription = Notifications.addListener(this._handleNotification);
 }

 _handleNotification = (notification) => {
   this.setState({notification: notification});
   console.log(notification);
 };

  render() {
    return (
      <View style={styles.container}>
        <SleepBetter style={{ width: Dimensions.get("window").width }} />
        <Text>{this.state.token}</Text>
        <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Email"
              placeholderTextColor = "#9a73ef"
              autoCapitalize = "none"
              onChangeText = {this.handleUsername}/>
        <Button title="Register Phone for Experiment" onPress={this.ChangeTextFunction}/>


      </View>
    );
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
