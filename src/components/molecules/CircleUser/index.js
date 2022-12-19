import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const CircleUser = ({props}) => {
  return (
    <TouchableOpacity style={{width: 60, marginLeft: 20}} key={props.id}>
      <Image
        source={{uri: props.picture}}
        style={{height: 60, width: 60, borderRadius: 60 / 2}}
      />
      <Text style={{textAlign: 'center'}}>{props.firstName}</Text>
    </TouchableOpacity>
  );
};

export default CircleUser;

const styles = StyleSheet.create({});
