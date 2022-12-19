import {Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import {IC_BACK, IMG_ACCOUNT_BLACK} from '../../../res';
import {styles} from './styles';

const Header = ({onPress, type, text}) => {
  if (type == 'header-screen') {
    return (
      <View style={styles.containerHeaderScreen}>
        <TouchableOpacity onPress={onPress} style={styles.wrapperIconBack}>
          <IC_BACK />
        </TouchableOpacity>
        <Text style={styles.titleHeaderScreen}>{text}</Text>
      </View>
    );
  }
  if (type == 'home') {
    return (
      <View style={styles.containerHome}>
        <Text style={styles.title}>TCGRDNA</Text>
        <TouchableOpacity onPress={onPress}>
          <Image source={IMG_ACCOUNT_BLACK} style={styles.wrapperAvatar} />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.wrapperIconBack}>
        <IC_BACK />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
