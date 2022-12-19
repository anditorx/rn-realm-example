import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {colors, fonts} from '../../../res';
import {windowHeight, windowWidth} from '../../../utils';
const Loading = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <ActivityIndicator size="large" color={'#ED23D9'} />
        <Text style={styles.text}>Please Wait...</Text>
      </View>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    flex: 1,
    backgroundColor: colors.loadingBackground,
    height: windowHeight,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    color: '#ED23D9',
    fontSize: 14,
    // marginTop: 12,
    marginLeft: 10,
  },
});
