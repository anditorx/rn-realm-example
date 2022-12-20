import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Button, Gap, Header, Input} from '../../components';
import {responsiveHeight, showToast, windowWidth} from '../../utils';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {colors, UserListDummy} from '../../res';
import {useDispatch, useSelector} from 'react-redux';
import {
  registerUserAction,
  registerUserDummyAction,
  viewAllUserAction,
} from '../../redux/actions/AuthAction';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import Realm from 'realm';
import {UserSchema} from '../../db/realm';
import {createUserDummy, queryAllUserLists} from '../../db/user_schemas';

const Login = ({navigation}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
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

  // NOTE: Get Data
  const getData = () => {
    setIsLoading(true);
    // NOTE: Get Data Realm
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
          navigation.navigate('Home', userList);
        } else {
          showToast('Invalid email or password', '', 'danger');
        }
      }
    }, 2000);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar barStyle={'dark-content'} backgroundColor="white" />
      {isLoading ? (
        <View>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <Gap height={30} />
          <View style={{paddingHorizontal: 20}}>
            <Text style={{color: 'black', fontSize: 35, fontWeight: 'bold'}}>
              LOGIN
            </Text>

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
            <Text
              style={{textAlign: 'center', fontSize: 14, color: colors.black}}>
              Create New Account
            </Text>
          </TouchableOpacity>
          <Gap height={25} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Login;
