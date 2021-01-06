import { GET_DESKTOP_ITEMS_START, GET_DESKTOP_ITEMS_SUCCESS } from './desktop.actions';

const initialState = {
  items: [],
  current_ticket: {},
  loading: false,
  checkListLoading: false,
};

const desktopReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DESKTOP_ITEMS_SUCCESS: {
      return { ...state, items: action.desktopItems };
    }
    case GET_DESKTOP_ITEMS_START: {
      return { ...state, filter: action.filter };
    }
    default: return state;
  }
};

export default desktopReducer;
