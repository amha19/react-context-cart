import React, { useContext, useReducer } from 'react';

import data from '../data';
import { reducer } from '../reducer';

const AppContext = React.createContext();

const priceArr = data.map((item) => item.price);
const sum = priceArr.reduce((acc, curr) => {
  acc = acc + curr;
  return acc;
});

const initialState = {
  isLoading: false,
  mobiles: data,
  totalPrice: sum,
  totalItem: 3,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
