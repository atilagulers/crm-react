import React, {useEffect, useState, useContext} from 'react';
import CallTable from './CallTable';
import {AppContext} from '../../Contexts/AppContext';
import axios from 'axios';
import LoadingSpinner from '../../Components/LoadingSpinner';

function WillBeCalled() {
  const {state, dispatch} = useContext(AppContext);

  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchCustomers = async () => {
      setIsFetching(true);
      try {
        const {data} = await axios.get(
          `${process.env.REACT_APP_API}/customer?page=1&limit=30&sortBy=firstName&sortOrder=1&willBeCalled=true&callDate=future`,
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
            cancelToken: source.token,
          }
        );

        dispatch({type: 'UPDATE_FUTURE_CALLS', data});
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

  return <CallTable customers={state.calls.today.list} />;
}

export default WillBeCalled;
