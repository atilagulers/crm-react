import React, {useEffect, useState, useContext} from 'react';
import {Container} from 'react-bootstrap';
import CustomerTable from './CustomerTable';
import {AppContext} from '../../Contexts/AppContext';
import axios from 'axios';
import LoadingSpinner from '../../Components/LoadingSpinner';
import Pagination from '../../Components/Pagination';

function ListCustomers() {
  const {state, dispatch} = useContext(AppContext);
  const customers = state.customers;
  const [isFetching, setIsFetching] = useState(true);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const limit = 20;

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchCustomers = async () => {
      //if (customers.list.length > 0) return setIsFetching(false);

      setIsFetching(true);
      try {
        const {data} = await axios.get(
          `${process.env.REACT_APP_API}/customer?page=${customers.currentPage}&limit=${limit}&sortBy=firstName&sortOrder=1`,
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
        setIsFetching(false);
      }
    };
    fetchCustomers();

    return () => {
      source.cancel();
    };
  }, [customers.currentPage, dispatch, state.token]);

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

  const handleClickPage = async ({selected}) => {
    const page = selected + 1;
    setIsFetching(true);
    try {
      const {data} = await axios.get(
        `${process.env.REACT_APP_API}/customer?page=${page}&limit=${limit}&sortBy=firstName&sortOrder=1`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      dispatch({type: 'UPDATE_CUSTOMERS', data});
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  if (isFetching || isUpdatingUser) return <LoadingSpinner />;

  return (
    <Container className="p-0">
      <CustomerTable
        customers={customers.list}
        handleSelectUser={handleSelectUser}
      />
      <Pagination
        handleClickPage={handleClickPage}
        totalPages={customers.totalPages}
        currentPage={customers.currentPage - 1}
      />
    </Container>
  );
}

export default ListCustomers;
