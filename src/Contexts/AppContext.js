import React, {createContext} from 'react';
import {useImmerReducer} from 'use-immer';

const initialState = {
  loggedIn: Boolean(localStorage.getItem('token')),
  token: localStorage.getItem('token'),
  user: {
    username: localStorage.getItem('username'),
    firstName: localStorage.getItem('firstName'),
    lastName: localStorage.getItem('lastName'),
    role: localStorage.getItem('role'),
  },
  management: {
    users: [],
    hotels: [],
    airlines: [],
    games: [],
  },
  customers: {},
};

const reducer = (draft, action) => {
  switch (action.type) {
    case 'LOG_IN':
      draft.loggedIn = true;
      draft.token = action.data.token;
      draft.user = action.data.user;

      return;
    case 'LOG_OUT':
      draft.loggedIn = false;
      window.location.href = '/login';
      return;
    case 'UPDATE_USERS':
      draft.management.users = action.data.users;
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
