import React, {useEffect, useState, useContext} from 'react';
import CustomerGroupTable from './CustomerGroupTable';
import axios from 'axios';
import {AppContext} from '../../Contexts/AppContext';
import LoadingSpinner from '../../Components/LoadingSpinner';

function ListCustomerGroups() {
  const {state, dispatch} = useContext(AppContext);
  const customerGroups = state.customerGroups;
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchCustomers = async () => {
      setIsFetching(true);
      try {
        const {data} = await axios.get(
          `${process.env.REACT_APP_API}/customer-group?page=1&limit=30`,
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
            cancelToken: source.token,
          }
        );

        dispatch({type: 'UPDATE_CUSTOMER_GROUPS', data});
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
  }, []);

  if (isFetching) return <LoadingSpinner />;

  return <CustomerGroupTable customerGroups={customerGroups.list} />;
}

export default ListCustomerGroups;
