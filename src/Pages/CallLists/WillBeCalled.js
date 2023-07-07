import React, {useEffect, useState, useContext} from 'react';
import CallTable from './CallTable';
import {AppContext} from '../../Contexts/AppContext';
import axios from 'axios';
import LoadingSpinner from '../../Components/LoadingSpinner';
import Pagination from '../../Components/Pagination';
import {Container} from 'react-bootstrap';

function WillBeCalled() {
  const {state, dispatch} = useContext(AppContext);
  const calls = state.calls.future;
  const limit = 20;
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchCustomers = async () => {
      setIsFetching(true);
      try {
        const {data} = await axios.get(
          `${process.env.REACT_APP_API}/customer?page=1&limit=30&sortBy=firstName&sortOrder=1&willBeCalled=true&time=future`,
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

  const handleClickPage = async ({selected}) => {
    const page = selected + 1;
    setIsFetching(true);
    try {
      const {data} = await axios.get(
        `${process.env.REACT_APP_API}/customer?page=${page}&limit=${limit}&sortBy=firstName&sortOrder=1&willBeCalled=true&callDate=future`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      dispatch({type: 'UPDATE_FUTURE_CALLS', data});
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  if (isFetching) return <LoadingSpinner />;

  return (
    <Container className="p-0">
      <CallTable customers={calls.list} />
      <Pagination
        handleClickPage={handleClickPage}
        totalPages={calls.totalPages}
        currentPage={calls.currentPage - 1}
      />
    </Container>
  );
}

export default WillBeCalled;
