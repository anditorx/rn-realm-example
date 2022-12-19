import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {windowWidth} from '../../utils';
import {colors} from '../../res';
import {useSelector} from 'react-redux';
import {queryAllUserLists} from '../../db/user_schemas';

const Home = ({route}) => {
  const [userList, setUserList] = useState(null);
  const {numSlice, setNumSlice} = useState(4);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // NOTE: Get Data
  const getData = () => {
    setIsLoading(true);
    // NOTE: Get Data Realm
    queryAllUserLists()
      .then(res => setUserList(res))
      .catch(e => console.tron.log('🚀 ~ error :=>', e.message));
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  const renderList = ({item}) => {
    return (
      <View
        style={{
          height: 100,
          backgroundColor: colors.greyLowOpacity,
          padding: 20,
          marginVertical: 5,
          width: windowWidth - 40,
          justifyContent: 'center',
          alignSelf: 'center',
          borderRadius: 15,
        }}>
        <Text style={{color: 'black'}}>{item?.user_fullname}</Text>
        <Text style={{color: 'black'}}>{item?.user_phone}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar barStyle={'dark-content'} backgroundColor="white" />
      {isLoading ? (
        <View>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            data={userList?.slice(0, numSlice)}
            renderItem={renderList}
            keyExtractor={item => item.user_id}
            // maxToRenderPerBatch={5}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
