export const buyNowReducer = (state = { buyNow: false, buyNowItem: {} }, action) => {
  switch (action.type) {
    case 'UPDATE_BUY_NOW':
      return {
        ...state,
        buyNow: action.payload,
        emptyOrderCheck: true
      };
    case 'BUY_NOW_ITEM':
      return {
        ...state,
        buyNowItem: action.payload,
      };
    default:
      return state;
  }
};