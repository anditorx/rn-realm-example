import {
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {showToast} from '../../utils';
import {queryAllUserLists} from '../../db/user_schemas';
import {CardView, Header} from '../../components';

const Home = ({route, navigation}) => {
  const [data, setData] = useState(route?.params);
  const [currentLimit, setCurrentLimit] = useState(5);
  const [maxLimit, setMaxLimit] = useState(route?.params?.length);
  const [isLoading, setIsLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(3000).then(() => getData(5));
  }, []);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  // NOTE: Get Data
  const getData = limit => {
    // NOTE: Get Data Realm
    queryAllUserLists()
      .then(res => (setData(res), setCurrentLimit(limit), setRefreshing(false)))
      .catch(e => showToast(e.message, '', 'danger'));
  };

  const loadMoreData = () => {
    if (currentLimit <= maxLimit) {
      setTimeout(() => {
        let limit = currentLimit + 5;
        getData(limit);
      }, 2000);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={'dark-content'} backgroundColor="white" />
      <Header type={'home'} onPress={() => navigation.navigate('Profile')} />
      {isLoading ? (
        <View>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <View style={styles.flex}>
          <FlatList
            data={data?.slice(0, currentLimit)}
            renderItem={({item}) => (
              <CardView item={item} navigation={navigation} />
            )}
            keyExtractor={(item, index) => index}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListFooterComponent={() => {
              return currentLimit <= maxLimit ? (
                <View style={styles.wrapperLoading}>
                  <ActivityIndicator size="large" color="#000" />
                </View>
              ) : null;
            }}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.1}
            maxToRenderPerBatch={5}
            updateCellsBatchingPeriod={5}
            initialNumToRender={5}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  flex: {
    flex: 1,
  },
  wrapperLoading: {alignSelf: 'center', paddingVertical: 10},
});
