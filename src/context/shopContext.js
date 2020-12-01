import React, { useContext, useEffect, useReducer } from 'react';

import { reducer } from './reducer';

const AppContext = React.createContext();

const fetchData = async () => {
  const response = await fetch(
    'https://course-api.com/react-useReducer-cart-project'
  );
  const data = await response.json();
  return data;
};

const initialState = {
  isLoading: true,
  mobiles: [],
  totalPrice: 0,
  totalItem: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchData().then((data) => {
      dispatch({ type: 'FETCH_DATA', payload: data });
    });
  }, []);

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
