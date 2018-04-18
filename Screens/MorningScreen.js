import React from 'react';
import { ListView, Text, View, StyleSheet, ActivityIndicator, Dimensions, Image, Button,TouchableHighlight, Picker } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { StackNavigator} from 'react-navigation';
import { Constants } from 'expo';
import styleConstants from '../Styles/Global.js';
import NavigationBar from '../Components/Navigation';
import AutoHeightImage from 'react-native-auto-height-image';
import {PUSH_ENDPOINT} from '../App.js';



export class MorningScreen extends React.Component {
  static navigationOptions = {
    title: 'MorningScreen',

  };

  constructor () {
    super();
    var usedDictQuestions = {};
    this.state = {
      loading: false,
      question:false,
      checked0: false,
      checked1: false,
      checked2: false,
      checked3: false,
      checked4: false,
      checked5: false,
      rateSleep: 5,
    };
 }

 showQuestions = () => {
    this.setState({question:true});

    var dictQuestions = {
      "Coffee":"Had coffee",
      "Meal":"Ate a big meal",
      "Exercised":"Exercised",
      "Yoga":"Did some yoga",
      "Alchol":"Drink booze",
      "Screen":"Look at a screen",
      "Stressed":"Where stressed",
      "Hungry":"Where hungry",
      "Troubles":"Hard time getting asleep",
      "Caffeine":"Have some caffeine drinks",
      "Medication":"Take any medication",
      "Tea":"Drink tea",
      "Games":"Play video games",
      "Shower":"Take a shower",
      "Meditate":"Meditate",
      "Read":"Read a book",
    };

    usedDictQuestions = {};

    var count = 0;
    while (Object.keys(usedDictQuestions).length < 6) {
      for (var prop in dictQuestions)
      if (Math.random() < 1/Object.keys(dictQuestions).length && Object.keys(usedDictQuestions).length < 6)
      usedDictQuestions[prop] = dictQuestions[prop];

    }

 }

 submitQuestions = () => {
  let state = this.props.screenProps
  console.log(usedDictQuestions);
  // Create data
  let questions = [
    {
      "question" : usedDictQuestions[Object.keys(usedDictQuestions)[0]],
      "value" : this.state.checked0,
    },
    {
      "question" : usedDictQuestions[Object.keys(usedDictQuestions)[1]],
      "value" : this.state.checked1,
    },
    {
      "question" : usedDictQuestions[Object.keys(usedDictQuestions)[2]],
      "value" : this.state.checked2,
    },
    {
      "question" : usedDictQuestions[Object.keys(usedDictQuestions)[3]],
      "value" : this.state.checked3,
    },
    {
      "question" : usedDictQuestions[Object.keys(usedDictQuestions)[4]],
      "value" : this.state.checked4,
    },
    {
      "question" : usedDictQuestions[Object.keys(usedDictQuestions)[5]],
      "value" : this.state.checked5,
    },
    {
      "ratedSleep" : this.state.rateSleep,
    },
  ];

        (async() => {
        //alert('Token: ' + token + ' Username: ' + this.state.username)
        fetch(PUSH_ENDPOINT,{
        method: 'POST',
        headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'state': state, 'questions': questions }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if(responseJson.success){
                this.props.navigation.navigate('DailySummary',{answered_today: true});
                alert(responseJson.success)
            }else{
                alert(responseJson.error)
            }

          })
          .catch((error) =>{
            console.error(error);
          });
        })();
}
componentWillMount(){

     var answered_today = this.props.navigation.state.params.answered_today;

     console.log(this.props.navigation.state)

     console.log(answered_today)
     // If already answered today, go to summary;
     if(answered_today){
         this.setState({loading: true}, () => this.props.navigation.navigate('DailySummary',{answered_today: true}))
     }
}

  render() {
       // If already answered today, go to summary;
       if(this.state.loading){
           console.log("LOADING STATE")

           return(
           <View style={[styles.containerloading, styles.horizontal]}>
               <ActivityIndicator size="large" color="#0000ff" />
           </View>);
       } else {


   return (


      <View >



        {!this.state.question &&
        <View style={styles.container}>
                <NavigationBar
          title="Morning Screen"
          snavigation = {this.props.navigation}
        />

            <AutoHeightImage
              style={styles.image}
              width={styleConstants.deviceWidth-20}
              source={require('../images/marvel/morning_screen1.png')}
            />

          <TouchableHighlight style={styles.progress} onPress={() => this.showQuestions() } >
            <AutoHeightImage
              style={[styles.image, {marginTop:30}]}
              width={styleConstants.deviceWidth-20}
              source={require('../images/marvel/letsgo.png')}
            />
          </TouchableHighlight>
        </View> }

        {this.state.question &&
        <View style={styles.container2}>
        <NavigationBar
          title="Morning Screen"
          snavigation = {this.props.navigation}
        />
          <View style={styles.morningMessage}>
            <AutoHeightImage
              style={styles.image2}
              width={styleConstants.deviceWidth*0.3-20}
              source={require('../images/marvel/logo.png')}
            />
            <Text style={styles.text}>Which of the following statements are true, 3 hour before you sleep?</Text>

          </View>

          <CheckBox
              center
              title={usedDictQuestions[Object.keys(usedDictQuestions)[0]]}
              containerStyle={!this.state.checked0 ? styles.checkboxesN : styles.checkboxesG }
              textStyle={styles.checkboxesText}
              checkedIcon='check-circle'
              uncheckedIcon='minus-circle'
              size= {18}
              checked={this.state.checked0}
              onPress={() => this.setState({
                checked0: !this.state.checked0
                })
              }
            />
            <CheckBox
              center
              title={usedDictQuestions[Object.keys(usedDictQuestions)[1]]}
              containerStyle={!this.state.checked1 ? styles.checkboxesN : styles.checkboxesG }
              textStyle={styles.checkboxesText}
              checkedIcon='check-circle'
              uncheckedIcon='minus-circle'
              size= {18}
              checked={this.state.checked1}
              onPress={() => this.setState({
                checked1: !this.state.checked1
                })
              }
            />
            <CheckBox
              center
              title={usedDictQuestions[Object.keys(usedDictQuestions)[2]]}
              containerStyle={!this.state.checked2 ? styles.checkboxesN : styles.checkboxesG }
              textStyle={styles.checkboxesText}
              checkedIcon='check-circle'
              uncheckedIcon='minus-circle'
              size= {18}
              checked={this.state.checked2}
              onPress={() => this.setState({
                checked2: !this.state.checked2
                })
              }
            />
            <CheckBox
              center
              title={usedDictQuestions[Object.keys(usedDictQuestions)[3]]}
              containerStyle={!this.state.checked3 ? styles.checkboxesN : styles.checkboxesG }
              textStyle={styles.checkboxesText}
              checkedIcon='check-circle'
              uncheckedIcon='minus-circle'
              size= {18}
              checked={this.state.checked3}
              onPress={() => this.setState({
                checked3: !this.state.checked3
                })
              }
            />
            <CheckBox
              center
              title={usedDictQuestions[Object.keys(usedDictQuestions)[4]]}
              containerStyle={!this.state.checked4 ? styles.checkboxesN : styles.checkboxesG }
              textStyle={styles.checkboxesText}
              checkedIcon='check-circle'
              uncheckedIcon='minus-circle'
              size= {18}
              checked={this.state.checked4}
              onPress={() => this.setState({
                checked4: !this.state.checked4
                })
              }
            />
            <CheckBox
              center
              title={usedDictQuestions[Object.keys(usedDictQuestions)[5]]}
              containerStyle={!this.state.checked5 ? styles.checkboxesN : styles.checkboxesG }
              textStyle={styles.checkboxesText}
              checkedIcon='check-circle'
              uncheckedIcon='minus-circle'
              size= {18}
              checked={this.state.checked5}
              onPress={() => this.setState({
                checked5: !this.state.checked5
                })
              }
            />
            <View style={[styles.rateSleepContainer]}>
              <Text style={[styles.rateSleepText]}>
                Rate your sleep:
              </Text>
              <Picker
                style={[styles.input, styles.picker]}
                selectedValue={this.state.rateSleep}

                onValueChange={
                  (itemValue, itemIndex) => this.setState({
                    rateSleep: itemValue
                    })}>

                  <Picker.Item label="0" value="0" />
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="2" value="2" />
                  <Picker.Item label="3" value="3" />
                  <Picker.Item label="4" value="4" />
                  <Picker.Item label="5" value="5" />
              </Picker>
            </View>

          <TouchableHighlight style={styles.progress} onPress={() => this.submitQuestions()} >
            <AutoHeightImage
              style={styles.image3}
              width={styleConstants.deviceWidth-20}
              source={require('../images/marvel/letsgo.png')}
            />
          </TouchableHighlight>
        </View> }
      </View>
    )}}
  }



const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingBottom:40,
  },
  container2: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop:4,
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingBottom:40,
  },
  containerloading: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
},
  image: {
    paddingTop:10,
    resizeMode: 'contain',
  },
  image2: {
    paddingTop:10,
    marginBottom:20,
    marginTop: 20,
    resizeMode: 'contain',
  },
  image3: {
    marginTop:10,
    resizeMode: 'contain',
  },
  morningMessage: {
    width: styleConstants.deviceWidth - 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems : 'center',
  },
  text: {
    fontSize: 20,
    marginLeft: 20,
    width: styleConstants.deviceWidth *0.7 - 20,
  },
  checkboxesN: {
    backgroundColor: 'rgba(235,235,235,0.43)',
    height: 40,
  },
  checkboxesG: {
    backgroundColor: 'rgba(119,211,83,0.63)',
    height: 40,
  },
  checkboxesText: {
    color: "#5A6978",
    fontSize: 15,
  },
  picker: {
    color: '#b2beb5',
  },
  input:{
    height: 40,
    backgroundColor: 'rgba(225,225,225,0.2)',
    width: styleConstants.deviceWidth *0.5 - 20,
    padding: 10,
    color: '#fff'
  },

  rateSleepText: {
    width: styleConstants.deviceWidth *0.5 - 20,
  },

  rateSleepContainer: {
    marginTop: 10,
    width: styleConstants.deviceWidth - 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems : 'center',
  },
})
