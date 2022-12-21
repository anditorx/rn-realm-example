import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {navigate, windowHeight, windowWidth} from '../../../utils';
import {colors} from '../../../res';

const CardView = props => {
  if (props.type === 'user-detail') {
    return (
      <View style={styles.viewCard}>
        <Text style={styles.txtName}>{props.item?.user_fullname}</Text>
        <Text style={styles.txtPhone}>{props.item?.user_phone}</Text>
        <Text style={styles.txtPhone}>{props.item?.user_email}</Text>
        <Text style={styles.txtPhone}>{props.item?.user_address}</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={styles.viewCard}
      onPress={() => props.navigation.navigate('User', props.item)}>
      <Text style={styles.txtName}>{props.item?.user_fullname}</Text>
      <Text style={styles.txtPhone}>{props.item?.user_phone}</Text>
    </TouchableOpacity>
  );
};

export default CardView;

const styles = StyleSheet.create({
  viewCard: {
    height: windowHeight / 6,
    backgroundColor: colors.greyLowOpacity,
    padding: 20,
    marginVertical: 5,
    width: windowWidth - 40,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 15,
  },
  txtName: {color: 'black', fontWeight: 'bold', fontSize: 18},
  txtPhone: {color: 'black', fontSize: 14},
});
