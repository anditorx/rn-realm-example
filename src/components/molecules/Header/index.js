import {Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import {IC_BACK, IMG_ACCOUNT_BLACK} from '../../../res';
import {styles} from './styles';

const Header = ({onPress, type, text}) => {
  if (type === 'header-detail') {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          style={{paddingHorizontal: 15, paddingVertical: 20}}
          onPress={onPress}>
          <Image source={IC_BACK} style={{height: 40, width: 40}} />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
          }}>
          {text && <Text style={styles.title}>{text}</Text>}
        </View>
      </View>
    );
  }
  if (type === 'home') {
    return (
      <View style={styles.containerHome}>
        <Text style={styles.title}>TEST REALM</Text>
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
