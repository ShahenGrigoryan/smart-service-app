import { Toast } from 'native-base';
import * as Actions from './pages.actions';

const initialState = {
  route: 'Desktop',
  loading: false,
};

const pagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.CHANGE_ROUTE: {
      return { ...state, route: action.route };
    }
    case Actions.PAGE_FAILURE: {
      Toast.show({
        text: action.error, type: 'danger', position: 'top', textStyle: { textAlign: 'center' },
      });
      return state;
    }
    case Actions.START_LOADING: {
      return { ...state, loading: true };
    }
    case Actions.END_LOADING: {
      return { ...state, loading: false };
    }
    default: {
      return state;
    }
  }
};

export default pagesReducer;
