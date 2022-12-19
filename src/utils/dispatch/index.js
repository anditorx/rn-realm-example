export const dispatchLoading = (dispatch, type, loading) => {
  return dispatch({
    type: type,
    payload: {
      loading: loading,
      data: false,
      errorMessage: false,
    },
  });
};
export const dispatchRequest = (dispatch, type) => {
  return dispatch({
    type: type,
    payload: {
      loading: true,
      data: false,
      errorMessage: false,
    },
  });
};
export const dispatchSuccess = (dispatch, type, result) => {
  return dispatch({
    type: type,
    payload: {
      loading: false,
      data: result,
      errorMessage: false,
    },
  });
};
export const dispatchFailed = (dispatch, type, errorMessage) => {
  return dispatch({
    type: type,
    payload: {
      loading: false,
      data: false,
      errorMessage: errorMessage,
    },
  });
};
