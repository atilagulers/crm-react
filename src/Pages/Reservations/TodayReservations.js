import React, {useEffect, useState, useContext} from 'react';
import ReservationTable from './ReservationTable';
import {AppContext} from '../../Contexts/AppContext';
import axios from 'axios';
import LoadingSpinner from '../../Components/LoadingSpinner';
import Pagination from '../../Components/Pagination';
import {Container} from 'react-bootstrap';

function TodayReservations() {
  const {state, dispatch} = useContext(AppContext);
  const calls = state.calls.today;
  const [isFetching, setIsFetching] = useState(true);
  const limit = 20;

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchReservations = async () => {
      setIsFetching(true);
      try {
        const {data} = await axios.get(
          `${process.env.REACT_APP_API}/customer?page=${calls.currentPage}&limit=${limit}&sortBy=firstName&sortOrder=1&willBeCalled=true&callDate=today`,
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
            cancelToken: source.token,
          }
        );

        dispatch({type: 'UPDATE_TODAY_RESERVATIONS', data});
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchReservations();

    return () => {
      source.cancel();
    };
  }, []);

  const handleClickPage = async ({selected}) => {
    const page = selected + 1;
    setIsFetching(true);
    try {
      const {data} = await axios.get(
        `${process.env.REACT_APP_API}/customer?page=${page}&limit=${limit}&sortBy=firstName&sortOrder=1&willBeCalled=true&callDate=today`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      dispatch({type: 'UPDATE_TODAY_CALLS', data});
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  if (isFetching) return <LoadingSpinner />;

  return (
    <Container className="p-0">
      <ReservationTable customers={calls.list} />
      <Pagination
        handleClickPage={handleClickPage}
        totalPages={calls.totalPages}
        currentPage={calls.currentPage - 1}
      />
    </Container>
  );
}

export default TodayReservations;
