import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {IC_BACK} from '../../res';
import {CardView, Header} from '../../components';

const User = ({navigation, route}) => {
  const [data, setData] = useState(route?.params);
  return (
    <SafeAreaView>
      <Header
        type={'header-detail'}
        text="Detail"
        onPress={() => navigation.goBack()}
      />
      <View>
        <CardView type="user-detail" item={data} />
      </View>
    </SafeAreaView>
  );
};

export default User;

const styles = StyleSheet.create({});
