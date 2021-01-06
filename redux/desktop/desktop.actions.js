export const GET_DESKTOP_ITEMS_START = 'GET_DESKTOP_ITEMS_START';
export const GET_DESKTOP_ITEMS_SUCCESS = 'GET_DESKTOP_ITEMS_SUCCESS';

export const getDesktopItemsStart = (token, filter) => ({
  type: GET_DESKTOP_ITEMS_START,
  token,
  filter,
});

export const getDesktopItemsSuccess = (desktopItems) => ({
  type: GET_DESKTOP_ITEMS_SUCCESS,
  desktopItems,
});
