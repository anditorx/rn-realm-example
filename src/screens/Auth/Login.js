import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Gap, Input} from '../../components';
import {styles} from './styles';
import {
  getDataStorage,
  responsiveHeight,
  showToast,
  storeDataStorage,
} from '../../utils';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {colors, UserListDummy} from '../../res';
import {useIsFocused} from '@react-navigation/native';
import {createUserDummy, queryAllUserLists} from '../../db/user_schemas';
import {CONSTANT} from '../../constant';

const Login = ({navigation}) => {
  const isFocused = useIsFocused();
  const [active, setActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [userList, setUserList] = useState(null);

  const form = {
    email: '',
    password: '',
  };

  //ANCHOR: Formik Validation
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid Email').required('Email is required!'),
    password: Yup.string().required('Password is required!'),
  });

  useEffect(() => {
    if (isFocused) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  useEffect(() => {
    getUserLogged();
    if (userList && active) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Home', params: userList}],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userList, active]);

  // NOTE: Get User Login from Storage
  const getUserLogged = () => {
    getDataStorage(CONSTANT.STORAGE_USER_LOGIN)
      .then(res => {
        const data = res;
        if (data) {
          setActive(true);
        }
      })
      // eslint-disable-next-line handle-callback-err
      .catch(err => {
        // error
      });
  };

  // NOTE: Get Data
  const getData = () => {
    setIsLoading(true);
    queryAllUserLists()
      .then(res =>
        res?.length === 0 ? createUserWithDummyData() : setUserList(res),
      )
      .catch(e => showToast(e.message, '', 'danger'));
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  // NOTE: Create User Dummy
  const createUserWithDummyData = () => {
    setIsLoading(true);
    UserListDummy?.map(item => {
      createUserDummy(item)
        .then(res => getData())
        .catch(e => showToast(e.message, '', 'danger'));
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  //ANCHOR: Handle Submit
  const handleSubmit = (data, formikActions) => {
    setIsBtnLoading(true);
    const data_search = userList?.filter(obj =>
      JSON.stringify(obj).toLowerCase().includes(data?.email?.toLowerCase()),
    );

    setTimeout(() => {
      setIsBtnLoading(false);
      if (!data_search || data_search?.length === 0) {
        showToast('Invalid email or password', '', 'danger');
      } else {
        let pass = data?.password;
        let pass_input = data_search[0]?.user_password;

        if (pass === pass_input) {
          showToast('Login Success', '', 'success');
          formikActions.resetForm();
          setActive(true);
          // NOTE: local storage
          storeDataStorage(CONSTANT.STORAGE_USER_LOGIN, data_search[0]);
        } else {
          showToast('Invalid email or password', '', 'danger');
        }
      }
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={'dark-content'} backgroundColor="white" />
      {isLoading ? (
        <View>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <ScrollView style={styles.flex1} showsVerticalScrollIndicator={false}>
          <Gap height={30} />
          <View style={styles.content}>
            <Text style={styles.txtLoginTitle}>LOGIN</Text>

            <View style={{marginTop: 10}}>
              <Formik
                initialValues={form}
                validationSchema={validationSchema}
                onSubmit={(values, formikActions) => {
                  const data = {
                    email: values.email,
                    password: values.password,
                  };
                  handleSubmit(data, formikActions);
                }}>
                {({
                  values,
                  errors,
                  touched,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => {
                  const {email, password} = values;
                  return (
                    <>
                      <Input
                        label={'Email'}
                        value={email}
                        height={responsiveHeight(60)}
                        error={touched.email && errors.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                      />
                      <Input
                        label={'Password'}
                        value={password}
                        height={responsiveHeight(60)}
                        error={touched.password && errors.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        password
                      />
                      <Gap height={35} />
                      <Button
                        textButton="Login"
                        submiting={isBtnLoading}
                        onPress={handleSubmit}
                      />
                    </>
                  );
                }}
              </Formik>
            </View>
          </View>
          <Gap height={20} />
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.txtCreateAcc}>Create New Account</Text>
          </TouchableOpacity>
          <Gap height={25} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Login;
