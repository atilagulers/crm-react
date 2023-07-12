import React, {useEffect, useState, useContext} from 'react';
import ReservationTable from './ReservationTable';
import {AppContext} from '../../Contexts/AppContext';
import axios from 'axios';
import LoadingSpinner from '../../Components/LoadingSpinner';
import Pagination from '../../Components/Pagination';
import {Container} from 'react-bootstrap';

function FutureReservations() {
  const {state, dispatch} = useContext(AppContext);
  const reservations = state.reservations.future;
  const limit = 20;
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchReservations = async () => {
      setIsFetching(true);
      try {
        const {data} = await axios.get(
          `${process.env.REACT_APP_API}/reservation?page=1&limit=30&sortBy=createdAt&sortOrder=1&time=future`,
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
            cancelToken: source.token,
          }
        );

        dispatch({type: 'UPDATE_FUTURE_RESERVATIONS', data});
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
        `${process.env.REACT_APP_API}/customer?page=${page}&limit=${limit}&sortBy=firstName&sortOrder=1&time=future`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      dispatch({type: 'UPDATE_FUTURE_RESERVATIONS', data});
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  if (isFetching) return <LoadingSpinner />;

  return (
    <Container className="p-0">
      <ReservationTable reservations={reservations.list} />
      <Pagination
        handleClickPage={handleClickPage}
        totalPages={reservations.totalPages}
        currentPage={reservations.currentPage - 1}
      />
    </Container>
  );
}

export default FutureReservations;
