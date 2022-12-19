import React from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {styles} from './styles.js';
// dependencies
import LinearGradient from 'react-native-linear-gradient';

const Button = ({...props}) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <LinearGradient
        colors={['#090979', '#0083ff']}
        style={styles.linearGradient}>
        {props.submiting ? (
          <ActivityIndicator size="large" color="#ffff" />
        ) : (
          <Text style={styles.buttonText}>{props.textButton}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Button;
