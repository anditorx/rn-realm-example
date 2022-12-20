// import Axios from 'axios';
import * as ActionTypes from '../actionTypes.js';
import {CONSTANT, SERVICES} from '../../constant';
import {navigate, replace, showToast, storeDataStorage} from '../../utils';
import Realm from 'realm';
import {UserListDummy} from '../../res/index.js';
const realm = new Realm({path: 'DB_Test.realm'});

export const registerUserAction = (data, navigation) => {
  return dispatch => {
    // dispatch({type: ActionTypes.AUTH_REGISTER_REQUEST});

    try {
      realm.write(() => {
        var ID =
          realm.objects('user_details').sorted('user_id', true).length > 0
            ? realm.objects('user_details').sorted('user_id', true)[0].user_id +
              1
            : 1;

        realm.create('user_details', {
          user_id: ID,
          user_fullname: data?.fullName,
          user_phone: data?.phoneNumber,
          user_email: data?.email?.toLowerCase(),
          user_address: data?.address,
          user_password: data?.password,
        });
      });
      dispatch(viewAllUserAction());
      showToast(
        'You are registered successfully',
        'Please, login to using this app.',
        'success',
      );
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000);
    } catch (err) {
      dispatch({
        type: ActionTypes.AUTH_REGISTER_FAILED,
        payload: {
          dataUser: [],
        },
      });
    }
  };
};

export const viewAllUserAction = () => {
  return async dispatch => {
    // try {
    //   dispatch({type: ActionTypes.GET_USER_LIST_REQUEST});
    //   const realms = new Realm({path: 'DB_Test.realm'});
    //   const user_details = realms.objects('user_details');
    //   if (user_details.length > 0) {
    //     dispatch({
    //       type: ActionTypes.GET_USER_LIST_SUCCESS,
    //       payload: {
    //         listUser: user_details,
    //       },
    //     });
    //   } else {
    //     dispatch(registerUserDummyAction());
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    // =====
    function onSuccess(user_details) {
      dispatch({
        type: ActionTypes.GET_USER_LIST_SUCCESS,
        payload: {
          listUser: user_details,
        },
      });
      return user_details;
    }
    function onError(error) {
      // dispatch({ type: ERROR_GENERATED, error });
      return error;
    }
    try {
      dispatch({type: ActionTypes.GET_USER_LIST_REQUEST});
      const realms = new Realm({path: 'DB_Test.realm'});
      const user_details = realms.objects('user_details');

      return onSuccess(user_details);
    } catch (error) {
      return onError(error);
    }
  };
};

export const registerUserDummyAction = (data, navigation) => {
  return dispatch => {
    try {
      dispatch({type: ActionTypes.GET_USER_LIST_REQUEST});
      realm.write(() => {
        realm.create('user_details', {
          user_id: 1,
          user_fullname: 'Ani',
          user_phone: '08192091210',
          user_email: 'ani@gmail.com',
          user_address: 'Jalan Pegangsaan Raya No.19, Jakarta Selatan',
          user_password: 'Password1',
        });
        realm.create('user_details', {
          user_id: 2,
          user_fullname: 'Budi Satria',
          user_phone: '08192091221',
          user_email: 'budisatria@gmail.com',
          user_address: 'Jalan Damai Raya No.12, Jakarta Utara',
          user_password: 'Password1',
        });
        realm.create('user_details', {
          user_id: 3,
          user_fullname: 'Citra Wardhani',
          user_phone: '08112091221',
          user_email: 'citra@gmail.com',
          user_address: 'Jalan Alumununium Blok C No.31, Jakarta Selatan',
          user_password: 'Password1',
        });
        realm.create('user_details', {
          user_id: 4,
          user_fullname: 'Dandi Wjiaya',
          user_phone: '08131920121',
          user_email: 'dandiwijaya@gmail.com',
          user_address: 'Jalan Perak Blok F No.19, Jakarta Selatan',
          user_password: 'Password1',
        });
        realm.create('user_details', {
          user_id: 5,
          user_fullname: 'Eka Satria',
          user_phone: '08561920126',
          user_email: 'eka@gmail.com',
          user_address: 'Jalan Juraganan No.17, Jakarta Selatan',
          user_password: 'Password1',
        });
      });
      dispatch({
        type: ActionTypes.GET_USER_LIST_SUCCESS,
        payload: {
          listUser: UserListDummy,
        },
      });
    } catch (err) {
      dispatch({
        type: ActionTypes.GET_USER_LIST_FAILED,
        payload: {
          listUser: [],
        },
      });
    }
  };
};
