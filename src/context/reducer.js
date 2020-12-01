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
    case 'CHANGE_AMOUNT':
      const { id, type } = action.payload;
      let price = state.totalPrice;
      let itemAmount = state.totalItem;
      const newMobile = [...state.mobiles].map((item) => {
        if (item.id === id) {
          if (type === 'inc') {
            price += +item.price;
            itemAmount += 1;
            return { ...item, amount: item.amount + 1 };
          }
          if (type === 'dec') {
            if (item.amount > 0) {
              price -= +item.price;
              itemAmount -= 1;
              return { ...item, amount: item.amount - 1 };
            }
          }
        }
        return item;
      });
      return {
        ...state,
        mobiles: newMobile,
        totalPrice: price,
        totalItem: itemAmount,
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
