import {StyleSheet} from 'react-native';
import {colors} from '../../../res';

const styles = StyleSheet.create({
  container: color => ({
    backgroundColor: color ? color : colors.primary,
    padding: 12,
    borderRadius: 12,
  }),
  textButton: fontColor => ({
    color: fontColor ? fontColor : colors.black,
    fontSize: 16,
    textAlign: 'center',
  }),
  containerDisable: {
    backgroundColor: colors.lightGrey,
    padding: 8,
    borderRadius: 12,
  },
  textButtonDisable: {
    color: colors.peace,
    fontSize: 16,
    textAlign: 'center',
  },
  textButtonNoContainer: {
    color: colors.black,
    fontSize: 12,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  linearGradient: {
    // flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    height: 50,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: 'transparent',
    fontWeight: 'bold',
  },
});

export {styles};
