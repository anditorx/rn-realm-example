import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../../../utils';
import {colors} from '../../../res';

const CardView = props => {
  return (
    <View style={styles.viewCard}>
      <Text style={styles.txtName}>{props.item?.user_fullname}</Text>
      <Text style={styles.txtPhone}>{props.item?.user_phone}</Text>
    </View>
  );
};

export default CardView;

const styles = StyleSheet.create({
  viewCard: {
    height: windowHeight / 5,
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
