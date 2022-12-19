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
import {Button, Gap, Header, Input} from '../../components';
import {responsiveHeight, windowWidth, showToast} from '../../utils';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {colors} from '../../res';
import {useDispatch, useSelector} from 'react-redux';
import {
  registerUserAction,
  viewAllUserAction,
} from '../../redux/actions/AuthAction';

const Register = ({navigation}) => {
  const {loadingAuth, listUser} = useSelector(state => state.AuthReducer);
  const [isSubmitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();

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

  //ANCHOR: Handle Submit
  const handleSubmit = async data => {
    const data_search = await listUser?.filter(obj =>
      JSON.stringify(obj).toLowerCase().includes(data?.email?.toLowerCase()),
    );

    if (data_search?.length > 0) {
      if (data_search[0].email === data.email.toLowerCase()) {
        showToast('Email already exists', '', 'danger');
      }
      if (data_search[0].phoneNumber === data.phoneNumber) {
        showToast('Phone number already exists', '', 'danger');
      }
    } else {
      dispatch(registerUserAction(data, navigation));
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar barStyle={'dark-content'} backgroundColor="white" />
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <Gap height={30} />
        <View style={{paddingHorizontal: 20}}>
          <Text style={{color: 'black', fontSize: 35, fontWeight: 'bold'}}>
            Register
          </Text>

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
                handleSubmit(data);
                setTimeout(() => {
                  formikActions.resetForm();
                  formikActions.setSubmitting(loadingAuth);
                  // setSubmitting(false);
                }, 5000);
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
          <Text
            style={{textAlign: 'center', fontSize: 14, color: colors.black}}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
        <Gap height={25} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
