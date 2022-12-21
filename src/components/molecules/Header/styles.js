import {StyleSheet} from 'react-native';
import {colors} from '../../../res';
import {windowHeight, windowWidth} from '../../../utils';

const styles = StyleSheet.create({
  containerHeaderScreen: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
  },
  containerHome: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  wrapperIconBack: {
    backgroundColor: 'white',
    zIndex: 99,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  wrapperAvatar: {height: 30, width: 30, borderRadius: 30 / 2},
  title: {fontSize: 22, fontWeight: 'bold', color: '#000'},
  titleHeaderScreen: {
    textAlign: 'center',
    flex: 1,
    marginLeft: -50,
    fontWeight: 'bold',
    fontSize: 24,
    color: '#ED23D9',
  },
});

export {styles};
