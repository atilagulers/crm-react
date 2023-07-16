import React, {useEffect, useState, useContext} from 'react';
import CallTable from './CallTable';
import {AppContext} from '../../Contexts/AppContext';
import axios from 'axios';
import LoadingSpinner from '../../Components/LoadingSpinner';
import Pagination from '../../Components/Pagination';
import {Container} from 'react-bootstrap';
import CallListTable from '../../Components/CallListTable';
import {useNavigate} from 'react-router-dom';
import {formatDate} from '../../Helpers';

function PlannedForToday() {
  const {state, dispatch} = useContext(AppContext);
  const calls = state.calls.today;
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(true);
  const limit = 50;

  const COLUMNS = [
    {
      Header: 'Tarih',
      accessor: 'callDate',
      Cell: ({value}) => {
        return formatDate(value);
      },
    },
    {
      Header: 'Adı',
      accessor: 'firstName',
    },
    {
      Header: 'Soyadı',
      accessor: 'lastName',
    },
    {
      Header: 'Telefon 1',
      accessor: 'phone1',
    },
    {
      Header: 'Telefon 2',
      accessor: 'phone2',
    },
    {
      Header: 'Telefon 3',
      accessor: 'phone3',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Agent',
      accessor: 'user[0]',
      Cell: ({value}) => {
        const {firstName, lastName} = value;
        return <span>{`${firstName} ${lastName}`}</span>;
      },
    },
    {
      Header: 'Grup',
      accessor: 'customerGroup[0].name',
    },
  ];

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchCustomers = async () => {
      setIsFetching(true);
      try {
        const {data} = await axios.get(
          `${process.env.REACT_APP_API}/customer?page=${calls.currentPage}&limit=${limit}&sortBy=firstName&sortOrder=1&willBeCalled=true&time=today`,
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
            cancelToken: source.token,
          }
        );

        dispatch({type: 'UPDATE_TODAY_CALLS', data});
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
  }, [calls.currentPage, dispatch, state.token]);

  const handleClickPage = async ({selected}) => {
    const page = selected + 1;
    setIsFetching(true);
    try {
      const {data} = await axios.get(
        `${process.env.REACT_APP_API}/customer?page=${page}&limit=${limit}&sortBy=firstName&sortOrder=1&willBeCalled=true&time=today`,
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

  const handleClickDetails = (customerId) => {
    navigate(`/customers/${customerId}`);
  };

  if (isFetching) return <LoadingSpinner />;
  return (
    <Container className="p-0">
      <CallListTable
        columns={COLUMNS}
        data={calls.list}
        handleClickDetails={handleClickDetails}
      />

      <Pagination
        handleClickPage={handleClickPage}
        totalPages={calls.totalPages}
        currentPage={calls.currentPage - 1}
      />
    </Container>
  );
}

export default PlannedForToday;
