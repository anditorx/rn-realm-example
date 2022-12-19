import {Dimensions} from 'react-native';

export const windowHeight = Dimensions.get('window').height;
export const windowWidth = Dimensions.get('window').width;

const heightMobileUI = 896; // height screen in ui
const widthMobileUI = 414; // width screen in ui

export const responsiveWidth = width => {
  return (windowWidth * width) / widthMobileUI;
};

export const responsiveHeight = height => {
  return (windowHeight * height) / heightMobileUI;
};
