import React, {useEffect, useState, useContext} from 'react';
import {Container} from 'react-bootstrap';
import CustomerTable from './CustomerTable';
import {AppContext} from '../../Contexts/AppContext';
import axios from 'axios';
import LoadingSpinner from '../../Components/LoadingSpinner';

function ListCustomers() {
  const {state, dispatch} = useContext(AppContext);
  const customers = state.customers;

  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchCustomers = async () => {
      //if (customers.list.length > 0) return setIsLoading(false);

      setIsLoading(true);
      try {
        const {data} = await axios.get(
          `${process.env.REACT_APP_API}/customer?page=1&limit=30`,
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
            cancelToken: source.token,
          }
        );

        dispatch({type: 'UPDATE_CUSTOMERS', data});
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCustomers();

    return () => {
      source.cancel();
    };
  }, [isUpdatingUser]);

  const handleSelectUser = async (userId, customerId) => {
    setIsUpdatingUser(true);

    try {
      const source = axios.CancelToken.source();
      const config = {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      };
      const body = {
        user: userId,
      };
      await axios.patch(
        `${process.env.REACT_APP_API}/customer/${customerId}`,
        body,
        config
      );

      return () => {
        source.cancel();
      };
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdatingUser(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <CustomerTable
      customers={customers.list}
      handleSelectUser={handleSelectUser}
    />
  );
}

export default ListCustomers;
