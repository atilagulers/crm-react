import React, {useEffect, useState, useContext} from 'react';
import {AppContext} from '../../Contexts/AppContext';
import axios from 'axios';
import LoadingSpinner from '../../Components/LoadingSpinner';
import Pagination from '../../Components/Pagination';
import {Container} from 'react-bootstrap';
import FilteringTable from '../../Components/FilteringTable';
import {useNavigate} from 'react-router-dom';
import {formatDate} from '../../Helpers';

function TodayReservations() {
  const {state, dispatch} = useContext(AppContext);
  const reservations = state.reservations.today;
  const navigate = useNavigate();
  const limit = 50;
  const [isFetching, setIsFetching] = useState(true);

  //const COLUMNS = [
  //  {
  //    Header: 'Müşteri Bilgileri',
  //    Footer: 'Müşteri Bilgileri',
  //    columns: [
  //      {
  //        Header: 'Müşteri',
  //        accessor: 'customer[0]',
  //        Cell: ({value}) => {
  //          const {firstName, lastName} = value;
  //          return <span>{`${firstName} ${lastName}`}</span>;
  //        },
  //      },
  //      {
  //        Header: 'Otel',
  //        accessor: 'hotel[0]',
  //        Cell: ({value}) => {
  //          return value.name;
  //        },
  //      },
  //    ],
  //  },
  //  {
  //    Header: 'Kalkış Bilgileri',
  //    Footer: 'Kalkış Bilgileri',
  //    columns: [
  //      {
  //        Header: 'Havayolu',
  //        accessor: 'departureAirline[0]',
  //        Cell: ({value}) => {
  //          return value.name;
  //        },
  //      },
  //      {
  //        Header: 'Tarih',
  //        accessor: 'departureDate',
  //        Cell: ({value}) => {
  //          return formatDate(value);
  //        },
  //      },
  //      {
  //        Header: 'Saat',
  //        accessor: 'departureTime',
  //      },
  //      {
  //        Header: 'Yer',
  //        accessor: 'departureDestination',
  //      },
  //      {
  //        Header: 'PNR',
  //        accessor: 'departurePNR',
  //      },
  //    ],
  //  },
  //  {
  //    Header: 'Varış Bilgileri',
  //    Footer: 'Varış Bilgileri',
  //    columns: [
  //      {
  //        Header: 'Havayolu',
  //        accessor: 'arrivalAirline[0]',
  //        Cell: ({value}) => {
  //          return value.name;
  //        },
  //      },
  //      {
  //        Header: 'Tarih',
  //        accessor: 'arrivalDate',
  //        Cell: ({value}) => {
  //          return formatDate(value);
  //        },
  //      },
  //      {
  //        Header: 'Saat',
  //        accessor: 'arrivalTime',
  //      },
  //      {
  //        Header: 'Yer',
  //        accessor: 'arrivalDestination',
  //      },
  //      {
  //        Header: 'PNR',
  //        accessor: 'arrivalPNR',
  //      },
  //    ],
  //  },
  //];
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
          `${process.env.REACT_APP_API}/reservation?page=1&limit=${limit}&sortBy=createdAt&sortOrder=1&time=today&userId=${state.user._id}`,
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
  }, [dispatch, state.token, state.user._id]);

  const handleClickPage = async ({selected}) => {
    const page = selected + 1;
    setIsFetching(true);
    try {
      const {data} = await axios.get(
        `${process.env.REACT_APP_API}/customer?page=${page}&limit=${limit}&sortBy=firstName&sortOrder=1&time=today&userId=${state.user._id}`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      dispatch({type: 'UPDATE_TODAY_RESERVATIONS', data});
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleClickDetails = (reservationId) => {
    navigate(`/reservations/${reservationId}/edit`);
  };

  if (isFetching) return <LoadingSpinner />;

  return (
    <Container className="p-0">
      <FilteringTable
        columns={COLUMNS}
        data={reservations.list}
        handleClickDetails={handleClickDetails}
        //firstColumnText="Güncelle"
        //icon="edit"
      />
      <Pagination
        handleClickPage={handleClickPage}
        totalPages={reservations.totalPages}
        currentPage={reservations.currentPage - 1}
      />
    </Container>
  );
}

export default TodayReservations;
