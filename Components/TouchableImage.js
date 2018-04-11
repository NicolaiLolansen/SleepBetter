import React from 'react';
import styleConstants from '../Styles/Global.js';

import { ListView, Text, Image, TextInput, TouchableOpacity, StackNavigator, TouchableHighlight, View, StyleSheet, Dimensions, Button } from 'react-native';


const images = {
    home: {
        calendar: require('../images/marvel/front_calendar.png'),
    },
    yolo: require('../images/yolo.jpg'),
};

class TouchableImage extends React.Component {
  constructor(props) {
      super(props)
  }

  render() {
    let imageName = this.props.image ? ('../images/marvel/' + this.props.image) : '../images/yolo.jpg';
    let navigateTo = this.props.navigate ? this.props.navigate : 'Morning';
    const pic = "reguire('" + imageName + "')";

    console.log(pic);
    return (
      <View>
         <TouchableHighlight onPress={() => this.props.navigation.navigate('Morning')}>
           <Image 
             style={styles.image}
             src={pic}
            />
         </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    paddingTop: 20,
    width: styleConstants.deviceWidth,
    marginLeft: -10,
    backgroundColor: styleConstants.themeBlue,
  },
  textContainer: {
    flex: 1,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
  },
  imageButton: {
    position: 'absolute'
  },
  image: {
    width: styleConstants.deviceWidth - 20,
    resizeMode: 'contain'
  }
})

export default TouchableImage;

