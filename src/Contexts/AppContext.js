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
    users: {
      list: [],
      totalCount: 1,
      totalPages: 1,
      currentPage: 1,
    },
    hotels: {
      list: [],
      totalCount: 1,
      totalPages: 1,
      currentPage: 1,
    },
    games: {
      list: [],
      totalCount: 1,
      totalPages: 1,
      currentPage: 1,
    },
    airlines: {
      list: [],
      totalCount: 1,
      totalPages: 1,
      currentPage: 1,
    },
  },
  customers: {
    list: [],
    totalCount: 1,
    totalPages: 1,
    currentPage: 1,
  },
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
      draft.management.users.list = action.data.users;
      draft.management.users.totalCount = action.data.totalCount;
      draft.management.users.currentPage = action.data.currentPage;
      draft.management.users.totalPages = action.data.totalPages;

      return;
    case 'UPDATE_HOTELS':
      draft.management.hotels.list = action.data.hotels;
      draft.management.hotels.totalCount = action.data.totalCount;
      draft.management.hotels.currentPage = action.data.currentPage;
      draft.management.hotels.totalPages = action.data.totalPages;
      return;
    case 'UPDATE_GAMES':
      draft.management.games.list = action.data.games;
      draft.management.games.totalCount = action.data.totalCount;
      draft.management.games.currentPage = action.data.currentPage;
      draft.management.games.totalPages = action.data.totalPages;
      return;
    case 'UPDATE_AIRLINES':
      draft.management.airlines.list = action.data.airlines;
      draft.management.airlines.totalCount = action.data.totalCount;
      draft.management.airlines.currentPage = action.data.currentPage;
      draft.management.airlines.totalPages = action.data.totalPages;
      return;
    case 'UPDATE_CUSTOMERS':
      draft.customers.list = action.data.customers;
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
