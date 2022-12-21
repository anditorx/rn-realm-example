import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {IMG_ACCOUNT_BLACK} from '../../res';
import {windowWidth} from '../../utils';
import {Gap} from '../../components';

const Profile = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, paddingHorizontal: 20}}>
        <View
          style={{
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={IMG_ACCOUNT_BLACK} style={{height: 100, width: 100}} />
        </View>
        <View>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: windowWidth / 5}}>
              <Text>Full Name</Text>
              <Text>Email</Text>
              <Text>Address</Text>
            </View>
            <View>
              <Text>: Test</Text>
              <Text>: Test</Text>
              <Text>: Test</Text>
            </View>
          </View>
          <Gap height={50} />
        </View>
      </View>
      <TouchableOpacity style={styles.btnLogOut}>
        <Text style={{textAlign: 'center', fontSize: 16, color: '#000'}}>
          Sign Out
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  btnLogOut: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'column',
    bottom: 0,
    paddingVertical: 50,
    paddingHorizontal: 20,
    width: '100%',
  },
});
