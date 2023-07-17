import React, {useEffect, useState, useContext} from 'react';
import ReservationTable from './ReservationTable';
import {AppContext} from '../../Contexts/AppContext';
import axios from 'axios';
import LoadingSpinner from '../../Components/LoadingSpinner';
import Pagination from '../../Components/Pagination';
import {Container} from 'react-bootstrap';
import FilteringTable from '../../Components/FilteringTable';
import {formatDate} from '../../Helpers';

function ReservationHistory() {
  const {state, dispatch} = useContext(AppContext);
  const reservations = state.reservations.past;
  const limit = 50;
  const [isFetching, setIsFetching] = useState(true);

  const COLUMNS = [
    {
      Header: 'Müşteri',
      accessor: 'customer[0]',
      Cell: ({value}) => {
        const {firstName, lastName} = value;
        return <span>{`${firstName} ${lastName}`}</span>;
      },
    },
    {
      Header: 'Otel',
      accessor: 'hotel[0]',
      Cell: ({value}) => {
        return value.name;
      },
    },
    {
      Header: 'Havayolu',
      accessor: 'departureAirline[0]',
      Cell: ({value}) => {
        return value.name;
      },
    },
    {
      Header: 'Tarih',
      accessor: 'departureDate',
      Cell: ({value}) => {
        return formatDate(value);
      },
    },
    {
      Header: 'Saat',
      accessor: 'departureTime',
    },
    {
      Header: 'Yer',
      accessor: 'departureDestination',
    },
    {
      Header: 'PNR',
      accessor: 'departurePNR',
    },
    {
      Header: 'Havayolu',
      accessor: 'arrivalAirline[0]',
      Cell: ({value}) => {
        return value.name;
      },
    },
    {
      Header: 'Tarih',
      accessor: 'arrivalDate',
      Cell: ({value}) => {
        return formatDate(value);
      },
    },
    {
      Header: 'Saat',
      accessor: 'arrivalTime',
    },
    {
      Header: 'Yer',
      accessor: 'arrivalDestination',
    },
    {
      Header: 'PNR',
      accessor: 'arrivalPNR',
    },
  ];

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchReservations = async () => {
      setIsFetching(true);
      try {
        const {data} = await axios.get(
          `${process.env.REACT_APP_API}/reservation?page=1&limit=30&sortBy=createdAt&sortOrder=1&time=past`,
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
            cancelToken: source.token,
          }
        );

        dispatch({type: 'UPDATE_PAST_RESERVATIONS', data});
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
  }, [dispatch, state.token]);

  const handleClickPage = async ({selected}) => {
    const page = selected + 1;
    setIsFetching(true);
    try {
      const {data} = await axios.get(
        `${process.env.REACT_APP_API}/customer?page=${page}&limit=${limit}&sortBy=firstName&sortOrder=1&time=past`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      dispatch({type: 'UPDATE_PAST_RESERVATIONS', data});
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  if (isFetching) return <LoadingSpinner />;

  return (
    <Container className="p-0">
      <FilteringTable columns={COLUMNS} data={reservations.list} />
      <Pagination
        handleClickPage={handleClickPage}
        totalPages={reservations.totalPages}
        currentPage={reservations.currentPage - 1}
      />
    </Container>
  );
}

export default ReservationHistory;
