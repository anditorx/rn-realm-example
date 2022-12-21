import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IMG_ACCOUNT_BLACK} from '../../res';
import {clearStorage, getDataStorage, windowWidth} from '../../utils';
import {Gap, Header} from '../../components';
import {CONSTANT} from '../../constant';

const Profile = ({navigation}) => {
  const [userLogin, setUserLogin] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getUserLogin();
  }, []);

  const getUserLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      getDataStorage(CONSTANT.STORAGE_USER_LOGIN)
        .then(res => {
          setUserLogin(res);
        })
        .catch(err => {});
    }, 2000);
  };

  const modalSignOut = () => {
    Alert.alert(
      'Logout',
      'Are you sure to logout?',
      [
        {text: 'Yes', onPress: handleSignOut},
        {
          text: 'No',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const handleSignOut = () => {
    clearStorage(CONSTANT.STORAGE_USER_LOGIN)
      .then(res => {
        navigation.reset({index: 0, routes: [{name: 'Login'}]});
      })
      // eslint-disable-next-line handle-callback-err
      .catch(err => {});
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {isLoading ? (
        <View>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <>
          <Header type={'header-detail'} onPress={() => navigation.goBack()} />
          <View style={styles.content}>
            <View style={styles.wrapperPhoto}>
              <Image source={IMG_ACCOUNT_BLACK} style={styles.photo} />
            </View>
            <View>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: windowWidth / 3.5}}>
                  <Text style={styles.text}>Full Name</Text>
                  <Text style={styles.text}>Phone Number</Text>
                  <Text style={styles.text}>Email</Text>
                  <Text style={styles.text}>Address</Text>
                </View>
                <View>
                  <Text style={styles.text}>: {userLogin?.user_fullname}</Text>
                  <Text style={styles.text}>: {userLogin?.user_phone}</Text>
                  <Text style={styles.text}>: {userLogin?.user_email}</Text>
                  <Text style={styles.text}>: {userLogin?.user_address}</Text>
                </View>
              </View>
              <Gap height={50} />
            </View>
          </View>
          <TouchableOpacity
            style={styles.btnLogOut}
            onPress={() => modalSignOut()}>
            <Text style={styles.txtSignOut}>Sign Out</Text>
          </TouchableOpacity>
        </>
      )}
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
  text: {
    fontSize: 16,
    color: '#000',
  },
  txtSignOut: {textAlign: 'center', fontSize: 16, color: '#000'},
  wrapperPhoto: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {height: 100, width: 100},
  content: {flex: 1, paddingHorizontal: 20},
});
