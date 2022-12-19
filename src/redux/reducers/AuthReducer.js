import * as ActionTypes from '../actionTypes';

const initialState = {
  dataUser: false,
  loadingAuth: false,
  successAuth: false,
  error: false,
  errorMessage: false,
  listUser: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SHOW_LOADING:
      return {
        ...state,
        loadingAuth: action.payload,
      };
    // REGISTER
    case ActionTypes.AUTH_REGISTER_REQUEST:
      return {
        ...state,
        loadingAuth: true,
        error: false,
        successAuth: false,
        errorMessage: false,
      };
    case ActionTypes.AUTH_REGISTER_SUCCESS:
      return {
        ...state,
        loadingAuth: false,
        successAuth: true,
        dataUser: action.payload.dataUser,
      };
    case ActionTypes.AUTH_REGISTER_FAILED:
      return {
        ...state,
        loadingAuth: false,
        error: true,
        successAuth: false,
        dataUser: action.payload.dataUser,
        errorMessage: action.payload.errorMessage,
      };
    case ActionTypes.GET_USER_LIST_SUCCESS:
      return {
        ...state,
        loadingAuth: true,
      };
    case ActionTypes.GET_USER_LIST_SUCCESS:
      return {
        ...state,
        loadingAuth: false,
        listUser: action.payload.listUser,
      };
    default:
      return state;
  }
}
