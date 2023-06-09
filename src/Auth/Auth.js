import React, {useEffect, useContext} from 'react';
import {Navigate} from 'react-router-dom';
import {AppContext} from '../Contexts/AppContext';

export const ProtectedRoute = ({children}) => {
  const {state} = useContext(AppContext);
  console.log(state.user.loggedIn);
  if (!state.user.loggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};
