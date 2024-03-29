import React from 'react';
import { ListView, Text, TextInput, TouchableHighlight, View, StyleSheet, Dimensions, Button, ActivityIndicator, KeyboardAvoidingView, Picker } from 'react-native';
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
import styleConstants from './Styles/Global.js';
import NavigationService from './NavigationService';


//let PUSH_ENDPOINT = "http://192.168.43.75:8080/push";
//let PUSH_ENDPOINT = "http://s134859.ml:8080/push";
let ENDPOINT = "http://34.240.2.7:8080"
//let ENDPOINT = "http://10.16.141.21:8080"
let PUSH_ENDPOINT = ENDPOINT+"/pushtoken";
let STATE_ENDPOINT = ENDPOINT+"/getstate";
let NOTIFICATION_PUSHENDPOINT = ENDPOINT+"/addnotification";
let NOTIFICATION_UPDATEENDPOINT = ENDPOINT+"/updatenotification";

export {ENDPOINT}
export {PUSH_ENDPOINT}

const SleepBetter = StackNavigator({
  Home: { screen: HomeScreen, navigationOptions: { header: null }},
  Progress: { screen: ProgressScreen, navigationOptions: { header: null } },
  Morning: { screen: MorningScreen, navigationOptions: { header: null }},
  DailySummary: { screen: SummaryScreen, navigationOptions: { header: null } },
  PersonalOverview: { screen: PersonalScreen, navigationOptions: { header: null }},
  Settings: { screen: SettingsScreen, navigationOptions: { header: null } },
  Challenges: { screen: ChallengeScreen, navigationOptions: { header: null } }
},
{ initialRouteName: "Home"},
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

  return token;

}

export default class App extends React.Component {
constructor(){
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
    super();
    this.state = {
        token: "",
        notification: [],
        username: "",
        registered: false,
        loading: true,
        gender: '',
        answered_today : false,

    };

    this.userData = {
        age: "",
        gender: "Gender...",
        sleepQuality: ""
    }
}

handleUsername = (text) => {
    this.setState({ username: text })
    // console.log(this.state.username)
    // console.log(this.userData)
}

setUserData = (key, value) => {
  if (value != "") {
    this.userData[key] = value;
    this.setState({key:value})
  }
  // console.log(this.state.username)
  // console.log(this.userData)
}


textInputFocused() {
 console.log("focus")
}


RegisterUser = () => {
    var allTrue = true;

    for (var key in this.userData) {
      if (this.userData[key] == "") {
        allTrue = false;
        break;
      }
    }
    if (this.state.username == "") {
      allTrue = false;
    }

    if (allTrue) {
      (async() => {
          let token = await registerForPushNotificationsAsync();
      //alert('Token: ' + token + ' Username: ' + this.state.username)
      fetch(PUSH_ENDPOINT,{
      method: 'POST',
      headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'state': this.state, 'data': this.userData }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.success){
              this.setState({registered: true,loading:false});
              alert(responseJson.success)

          }else{
              alert(responseJson.error)
              this.setState({registered: false , loading:false});
          }

        })
        .catch((error) =>{
          console.error(error);
        });

      })();
    }
    else {
      alert("Please fill in all fields!")
    }
}
 async componentDidMount() {
   let token = await registerForPushNotificationsAsync();
   url = ENDPOINT + "/getstate/"+token
   fetch(url)
   .then((response) => response.json())
   .then((responseJson) => {
       console.log("HANDLED LOGIN")

       //console.log(responseJson)
       if(responseJson.state){

           console.log("getState - State")
           console.log(responseJson.state)
           var questions = responseJson.state.questions;

           var current_day = new Date();

           var questions_answered = false;
           if(questions){
               for(var i = 0; i < questions.length; i++){
                   var day = questions[i].answered;
                   day = String(day).replace("Z","")
                   date = String(day).split('T');

                   var days = String(date[0]).replace("\"","").split('-');
                   var hours = String(date[1]).replace("\"","").split(':');
                   var day_answered = new Date(...[parseInt(days[0]),parseInt(days[1])-1,parseInt(days[2]),
                                                   parseInt(hours[0]),parseInt(hours[1]),parseInt(hours[2])]);
                 
                   console.log(day_answered)
                   console.log(current_day)
                   if(day_answered.getFullYear() === current_day.getFullYear() &&
                      day_answered.getMonth() === current_day.getMonth() &&
                      day_answered.getDate() === current_day.getDate()){
                          questions_answered = true;
                      }
               }
           }

           this.setState({registered: true ,token:token,loading: false,answered_today:questions_answered})





       } else{
           this.setState({token:token, loading: false})
       }
   })

   // Handle notifications that are received or selected while the app
   // is open. If the app was closed and then opened by tapping the
   // notification (rather than just tapping the app icon to open it),
   // this function will fire on the next tick after the app starts
   // with the notification data.
   this._notificationSubscription = Notifications.addListener(this._handleNotification);
 }

 _handleNotification = (notification) => {

   this.setState({notification: notification});
   if(notification.origin == "received" || notification.origin == "selected"){
   console.log("Handle OK");

   fetch(NOTIFICATION_UPDATEENDPOINT,{
       method: 'POST',
       headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
       body: JSON.stringify(notification),
   })
     .then((response) => response.json())
     .then((responseJson) => {
       if(responseJson.success){
           console.log("NAVIGATING FROM NOTIFICATION TO MORNING")
           console.log(this.state.answered_today)
           NavigationService.navigate("Morning",{answered_today: this.state.answered_today});
       }else{
           alert(responseJson)
       }
     })
     .catch((error) =>{
       console.error(error);
     });

 }
};

renderGenderPicker() {
  return (
     <Picker
        style={[styles.input, styles.picker]}
        // selectedValue={this.state.gender}
        selectedValue={this.userData.gender}
        // selectedValue={this.userData['gender']}
        onValueChange={(itemValue, itemIndex) => this.setUserData('gender', itemValue)}>
          <Picker.Item label="Gender..." value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="other" />
     </Picker>
  )
}

renderSleepQualityPicker () {
  return (
   <Picker
      style={[styles.input, styles.picker]}
      // selectedValue={this.state.gender}
      selectedValue={this.userData.sleepQuality}
      // selectedValue={this.userData['gender']}
      onValueChange={(itemValue, itemIndex) => this.setUserData('sleepQuality', itemValue)}>
        <Picker.Item label="Average Sleep Quality..." value="" />
        <Picker.Item label="0: I don't sleep at all" value="0" />
        <Picker.Item label="1: Bad" value="1" />
        <Picker.Item label="2: OK" value="2" />
        <Picker.Item label="3: Good" value="3" />
        <Picker.Item label="4: Very Good" value="4" />
        <Picker.Item label="5: Excellent" value="5" />
   </Picker>
  )
}

  render() {
    if(this.state.loading){
        console.log("LOADING STATE")

        return(
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>);
    } else {

        // if(this.state.registered && false){
    if(this.state.registered){
        console.log("REGISTERED STATE")
        console.log(this.state)
            return (
              <View style={styles.container}>
                <SleepBetter style={{ width: styleConstants.deviceWidth}} screenProps={this.state}
                    ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                    }}
                />
              </View>
            );


        } else{
            console.log("NOT REGISTERED STATE")
            return(
            <View style={styles.loginContainer}>

            <KeyboardAvoidingView style={styles.loginContainer} behavior="padding">
               <Text style = {styles.loginText}>Please register your phone for the SleepBetter prototype Experiment</Text>
               <TextInput style = {styles.input}
               autoCapitalize="none"
               onChangeText= {(text) => this.handleUsername(text) }
               autoCorrect={false}
               placeholder='Name'
               placeholderTextColor='rgba(225,225,225,0.7)'
               />

               <TextInput style = {styles.input}
               autoCapitalize="none"
               onChangeText= {(text) => this.setUserData('age', text)}
               autoCorrect={false}
               placeholder='Age...'
               placeholderTextColor='rgba(225,225,225,0.7)'
               />

              { this.renderGenderPicker() }

              { this.renderSleepQualityPicker() }

               <Button style ={styles.buttonContainer} title="Register Phone for Experiment" onPress={this.RegisterUser}/>
            </KeyboardAvoidingView>
          </View>
);
    }
    }
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
},
  picker: {
    color: '#b2beb5',
  },
  input:{
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 20,
        padding: 10,
        color: '#fff'
    },
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 15,
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    loginText:{
        padding: 15,
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700',
    },
    loginContainer:{
       flex: 1,
       padding: 30,
       backgroundColor: '#444',
       justifyContent: 'center'
   }
})
