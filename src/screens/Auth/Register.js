import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Gap, Input} from '../../components';
import {responsiveHeight, showToast} from '../../utils';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {createNewUser, queryAllUserLists} from '../../db/user_schemas';
import {styles} from './styles';

const Register = ({navigation}) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [userList, setUserList] = useState(null);

  const form = {
    fullName: '',
    phoneNumber: '',
    email: '',
    address: '',
    password: '',
  };

  //ANCHOR: Formik Validation
  const validationSchema = Yup.object({
    fullName: Yup.string().required('Name is required!'),
    phoneNumber: Yup.string().required('Phone Number is required!'),
    email: Yup.string().email('Invalid Email').required('Email is required!'),
    address: Yup.string().required('Address is required!'),
    password: Yup.string().required('Password is required!'),
  });

  useEffect(() => {
    getData();
  }, []);

  // NOTE: Get Data
  const getData = () => {
    // NOTE: Get Data Realm
    queryAllUserLists()
      .then(res => setUserList(res))
      .catch(e => showToast(e.message, '', 'danger'));
  };

  //ANCHOR: Handle Submit
  const handleSubmit = async (data, formikActions) => {
    const data_search = await userList?.filter(obj =>
      JSON.stringify(obj).toLowerCase().includes(data?.email?.toLowerCase()),
    );
    if (data_search?.length > 0) {
      if (data_search[0].user_email === data.email.toLowerCase()) {
        showToast('Email already exists', '', 'danger');
      }
      if (data_search[0].user_phone === data.phoneNumber) {
        showToast('Phone number already exists', '', 'danger');
      }
    } else {
      createNewUser(data)
        .then(res =>
          setTimeout(() => {
            showToast('Register Success', '', 'success');
            formikActions.resetForm();
          }, 2000),
        )
        .catch(e => showToast(e.message, '', 'danger'));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={'dark-content'} backgroundColor="white" />
      <ScrollView style={styles.flex1} showsVerticalScrollIndicator={false}>
        <Gap height={30} />
        <View style={styles.content}>
          <Text style={styles.txtLoginTitle}>Register</Text>

          <View style={{marginTop: 10}}>
            <Formik
              initialValues={form}
              validationSchema={validationSchema}
              onSubmit={(values, formikActions) => {
                const data = {
                  fullName: values.fullName,
                  phoneNumber: values.phoneNumber,
                  email: values.email,
                  address: values.address,
                  password: values.password,
                };
                handleSubmit(data, formikActions);
                setTimeout(() => {
                  formikActions.setSubmitting(isSubmitting);
                }, 3000);
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
                const {fullName, phoneNumber, email, address, password} =
                  values;
                return (
                  <>
                    <Input
                      label={'Full Name'}
                      value={fullName}
                      height={responsiveHeight(60)}
                      error={touched.fullName && errors.fullName}
                      onChangeText={handleChange('fullName')}
                      onBlur={handleBlur('fullName')}
                    />
                    <Input
                      label={'Phone Number'}
                      value={phoneNumber}
                      height={responsiveHeight(60)}
                      error={touched.phoneNumber && errors.phoneNumber}
                      onChangeText={handleChange('phoneNumber')}
                      onBlur={handleBlur('phoneNumber')}
                      keyboardType={'phone-pad'}
                    />
                    <Input
                      label={'Email'}
                      value={email}
                      height={responsiveHeight(60)}
                      error={touched.email && errors.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                    />
                    <Input
                      type={'textarea'}
                      label={'Address'}
                      value={address}
                      height={responsiveHeight(60)}
                      error={touched.address && errors.address}
                      onChangeText={handleChange('address')}
                      onBlur={handleBlur('address')}
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
                      textButton="Register"
                      submiting={isSubmitting}
                      onPress={handleSubmit}
                    />
                  </>
                );
              }}
            </Formik>
          </View>
        </View>
        <Gap height={20} />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.txtCreateAcc}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
        <Gap height={25} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
