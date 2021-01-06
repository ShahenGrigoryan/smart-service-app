export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const START_LOADING = 'START_LOADING';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const SET_DRAWER = 'SET_DRAWER';
export const GET_PAYROLLS_START = 'GET_PAYROLLS_START';
export const GET_PAYROLLS_SUCCESS = 'GET_PAYROLLS_SUCCESS';
export const GET_USER_START = 'GET_USER_START';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';

export const login = (user) => ({
  type: LOGIN_START,
  user,
});
export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  data,
});
export const loginFailure = (err) => ({
  type: LOGIN_FAILURE,
  err,
});

export const logout = (token) => ({
  type: LOGOUT,
  token,
});
export const setDrawer = () => ({
  type: SET_DRAWER,
});

export const startLoading = () => ({
  type: START_LOADING,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const getPayrollsStart = ({
  token, userId, startDate, endDate,
}) => ({
  type: GET_PAYROLLS_START,
  token,
  userId,
  startDate,
  endDate,
});
export const getPayrollsSuccess = (payrolls) => ({
  type: GET_PAYROLLS_SUCCESS,
  payrolls,
});

export const getUserStart = (token, user_id) => ({
  type: GET_USER_START,
  token,
  user_id,
});
export const getUserSuccess = (user) => ({
  type: GET_USER_SUCCESS,
  user,
});
