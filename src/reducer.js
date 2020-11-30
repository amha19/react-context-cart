export const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREASE_ITEM':
      const { iId, iAmount } = action.payload;
      const newIMobiles = [...state.mobiles];
      let iPrice;
      newIMobiles.forEach((item) => {
        if (item.id === iId) {
          item.amount = iAmount + 1;
          iPrice = item.price;
        }
      });
      // console.log('context: ', price);
      return {
        ...state,
        mobiles: newIMobiles,
        totalPrice: state.totalPrice + iPrice,
        totalItem: state.totalItem + 1,
      };
    case 'DECREASE_ITEM':
      const newDMobiles = [...state.mobiles];
      const { dId, dAmount } = action.payload;
      let dPrice;
      newDMobiles.forEach((item) => {
        if (item.id === dId) {
          if (dAmount > 0) {
            item.amount = dAmount - 1;
            dPrice = item.price;
          }
        }
      });
      return {
        ...state,
        mobiles: newDMobiles,
        totalPrice: state.totalPrice - dPrice,
        totalItem: state.totalItem - 1,
      };
    case 'CLEAR_ALL':
      return {
        ...state,
        mobiles: [],
        totalItem: 0,
        totalPrice: 0,
      };
    default:
      throw new Error('Action type not found!');
  }
};
