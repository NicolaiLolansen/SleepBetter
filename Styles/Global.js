
import { Dimensions, Platform } from 'react-native';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

export default {
  materialGreen: '#3cae47',
  materialBlue: '#2196f3',
  materialYellow: '#fcc81a',
  themeBlue: '#00a6ff',
  white: '#fff',
  black: '#000',
  deviceWidth: DEVICE_WIDTH,
  deviceHeight: DEVICE_HEIGHT,
  borderColor: '#EBEBEB',
  isAndroid: Platform.OS === 'android',
  isIOS: Platform.OS === 'ios',
  isIpad: DEVICE_WIDTH >= 768,
  statusBarHeight: (Platform.OS === 'android') ? 20 : 0,
};