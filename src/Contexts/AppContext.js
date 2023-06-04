import React, {createContext} from 'react';
import {useImmerReducer} from 'use-immer';

// Başlangıç durumu
const initialState = {
  management: {
    users: {
      list: [],
      isFetching: true,
    },
    hotels: [],
    airlines: [],
    games: [],
  },
  customers: {},
};

const reducer = (draft, action) => {
  switch (action.type) {
    case 'UPDATE_USERS':
      draft.management.users.list = action.data.users;
      return;
    default:
      return draft;
  }
};

const AppContext = createContext();

const AppProvider = ({children}) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  );
};

export {AppContext, AppProvider};
