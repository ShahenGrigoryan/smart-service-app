import { SET_NOT_FIRST } from './visit.actions';

const initialState = {
  count: 0,
};

const visitReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOT_FIRST: {
      return { ...state, count: 1 };
    }
    default: {
      return state;
    }
  }
};

export default visitReducer;
