import React, {createContext} from 'react';
import {useImmerReducer} from 'use-immer';
import Cookies from 'js-cookie';

const initialState = {
  loggedIn: Boolean(Cookies.get('token')),
  token: Cookies.get('token'),
  rememberMe: false,
  user: {
    _id: localStorage.getItem('id'),
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
  customerGroups: {
    list: [],
    totalCount: 1,
    totalPages: 1,
    currentPage: 1,
  },
  holdingCustomers: {
    list: [],
    totalCount: 1,
    totalPages: 1,
    currentPage: 1,
  },
  calls: {
    past: {
      list: [],
      totalCount: 1,
      totalPages: 1,
      currentPage: 1,
    },
    today: {
      list: [],
      totalCount: 1,
      totalPages: 1,
      currentPage: 1,
    },
    future: {
      list: [],
      totalCount: 1,
      totalPages: 1,
      currentPage: 1,
    },
  },

  reservations: {
    past: {
      list: [],
      totalCount: 1,
      totalPages: 1,
      currentPage: 1,
    },
    today: {
      list: [],
      totalCount: 1,
      totalPages: 1,
      currentPage: 1,
    },
    future: {
      list: [],
      totalCount: 1,
      totalPages: 1,
      currentPage: 1,
    },
  },
};

const reducer = (draft, action) => {
  switch (action.type) {
    case 'LOG_IN':
      draft.loggedIn = true;
      draft.token = action.data.token;
      draft.user = action.data.user;

      if (action.data.rememberMe) {
        const expirationDate = new Date();
        expirationDate.setMonth(expirationDate.getMonth() + 1);
        Cookies.set('token', action.data.token, {expires: expirationDate});
      } else {
        Cookies.set('token', action.data.token);
      }

      return;
    case 'LOG_OUT':
      Cookies.remove('token');
      draft.loggedIn = false;
      draft.token = null;
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
      draft.customers.totalCount = action.data.totalCount;
      draft.customers.currentPage = action.data.currentPage;
      draft.customers.totalPages = action.data.totalPages;
      return;

    case 'UPDATE_CUSTOMER_GROUPS':
      draft.customerGroups.list = action.data.customerGroups;
      draft.customerGroups.totalCount = action.data.totalCount;
      draft.customerGroups.currentPage = action.data.currentPage;
      draft.customerGroups.totalPages = action.data.totalPages;
      return;

    case 'UPDATE_HOLDING_CUSTOMERS':
      draft.holdingCustomers.list = action.data.customers;
      draft.holdingCustomers.totalCount = action.data.totalCount;
      draft.holdingCustomers.currentPage = action.data.currentPage;
      draft.holdingCustomers.totalPages = action.data.totalPages;
      return;

    case 'UPDATE_PAST_CALLS':
      draft.calls.past.list = action.data.calls;
      draft.calls.past.totalCount = action.data.totalCount;
      draft.calls.past.currentPage = action.data.currentPage;
      draft.calls.past.totalPages = action.data.totalPages;
      return;

    case 'UPDATE_TODAY_CALLS':
      draft.calls.today.list = action.data.customers;
      draft.calls.today.totalCount = action.data.totalCount;
      draft.calls.today.currentPage = action.data.currentPage;
      draft.calls.today.totalPages = action.data.totalPages;
      return;
    case 'UPDATE_FUTURE_CALLS':
      draft.calls.future.list = action.data.customers;
      draft.calls.future.totalCount = action.data.totalCount;
      draft.calls.future.currentPage = action.data.currentPage;
      draft.calls.future.totalPages = action.data.totalPages;
      return;

    case 'UPDATE_PAST_RESERVATIONS':
      draft.reservations.past.list = action.data.reservations;
      draft.reservations.past.totalCount = action.data.totalCount;
      draft.reservations.past.currentPage = action.data.currentPage;
      draft.reservations.past.totalPages = action.data.totalPages;
      return;

    case 'UPDATE_TODAY_RESERVATIONS':
      draft.reservations.today.list = action.data.reservations;
      draft.reservations.today.totalCount = action.data.totalCount;
      draft.reservations.today.currentPage = action.data.currentPage;
      draft.reservations.today.totalPages = action.data.totalPages;
      return;
    case 'UPDATE_FUTURE_RESERVATIONS':
      draft.reservations.future.list = action.data.reservations;
      draft.reservations.future.totalCount = action.data.totalCount;
      draft.reservations.future.currentPage = action.data.currentPage;
      draft.reservations.future.totalPages = action.data.totalPages;
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
