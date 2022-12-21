import {StyleSheet} from 'react-native';
import {colors} from '../../res';

const styles = StyleSheet.create({
  flex1: 1,
  safeArea: {flex: 1, backgroundColor: 'white'},
  content: {paddingHorizontal: 20},
  txtLoginTitle: {color: 'black', fontSize: 35, fontWeight: 'bold'},
  txtCreateAcc: {textAlign: 'center', fontSize: 14, color: colors.black},
});

export {styles};
