import { Toast } from 'native-base';
import * as Actions from './user.actions';

const initialState = {
  isLoggedIn: false,
  loading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.LOGIN_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        token: action.data.token,
        ...action.data.user,
        loading: false,
      };
    }
    case Actions.LOGIN_FAILURE: {
      Toast.show({
        text: `${action.err} login error`, type: 'danger', position: 'top', textStyle: { textAlign: 'center' },
      });
      return { ...state, isLoggedIn: false, loading: false };
    }
    case Actions.LOGOUT: {
      return {
        isLoggedIn: false, loading: false,
      };
    }
    case Actions.GET_USER_SUCCESS: {
      console.log('success', JSON.stringify({
        ...state, ...action.user,
      }));
      return {
        ...state, ...action.user,
      };
    }
    case Actions.LOGOUT_SUCCESS: {
      return { isLoggedIn: false, loading: false };
    }
    case Actions.SET_DRAWER: {
      return { ...state, drawer: action.drawer };
    }
    case Actions.START_LOADING: {
      return { ...state, loading: true };
    }
    case Actions.GET_PAYROLLS_SUCCESS: {
      return {
        ...state,
        payrolls: action.payrolls.payrolls,
        penalties: action.payrolls?.penalties,
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
