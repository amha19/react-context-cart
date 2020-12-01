export const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_DATA':
      const priceArr = action.payload.map((item) => item.price);
      const amountArr = action.payload.map((item) => item.amount);
      const priceSum = priceArr.reduce((acc, curr) => {
        acc = +acc + +curr;
        return acc;
      });

      const amountSum = amountArr.reduce((acc, curr) => {
        acc = +acc + +curr;
        return acc;
      });

      return {
        isLoading: false,
        mobiles: action.payload,
        totalPrice: priceSum,
        totalItem: amountSum,
      };
    case 'INCREASE_ITEM':
      const { iId, iAmount } = action.payload;
      const newIMobiles = [...state.mobiles];
      let iPrice;
      newIMobiles.forEach((item) => {
        if (item.id === iId) {
          item.amount = iAmount + 1;
          iPrice = +item.price;
        }
      });

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
            dPrice = +item.price;
          }
        }
      });
      return {
        ...state,
        mobiles: newDMobiles,
        totalPrice: state.totalPrice - dPrice,
        totalItem: state.totalItem - 1,
      };
    case 'REMOVE_ITEM':
      const { rId, rAmount, rPrice } = action.payload;
      const newMobiles = [...state.mobiles].filter((item) => item.id !== rId);
      return {
        ...state,
        mobiles: newMobiles,
        totalPrice: state.totalPrice - rPrice * rAmount,
        totalItem: state.totalItem - rAmount,
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
