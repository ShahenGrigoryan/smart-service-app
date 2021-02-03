export const CHANGE_ROUTE = 'CHANGE_ROUTE';
export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';
export const PAGE_FAILURE = 'PAGE_FAILURE';

export const changeRoute = (route) => ({
  type: CHANGE_ROUTE,
  route,
});

export const startLoading = () => ({
  type: START_LOADING,
});

export const endLoading = (message) => ({
  type: END_LOADING,
  message,
});

export const pageFailure = (error) => ({
  type: PAGE_FAILURE,
  error,
});
