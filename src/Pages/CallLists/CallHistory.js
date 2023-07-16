import React, {useEffect, useState, useContext} from 'react';
import {Container, Table} from 'react-bootstrap';
import {AppContext} from '../../Contexts/AppContext';
import axios from 'axios';
import LoadingSpinner from '../../Components/LoadingSpinner';
import {formatDate} from '../../Helpers';
import Pagination from '../../Components/Pagination';
import FilteringTable from '../../Components/FilteringTable';
import ColumnFilter from '../../Components/ColumnFilter';

function CallHistory() {
  const {state, dispatch} = useContext(AppContext);

  const calls = state.calls.past;
  const [isFetching, setIsFetching] = useState(true);
  const limit = 50;

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchCalls = async () => {
      setIsFetching(true);
      try {
        const {data} = await axios.get(
          `${process.env.REACT_APP_API}/call?page=${calls.currentPage}&limit=${limit}&sortBy=createdAt&sortOrder=-1`,
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
            cancelToken: source.token,
          }
        );

        dispatch({type: 'UPDATE_PAST_CALLS', data});
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchCalls();

    return () => {
      source.cancel();
    };
  }, [state.token, calls.currentPage, dispatch]);

  const handleClickPage = async ({selected}) => {
    const page = selected + 1;
    setIsFetching(true);
    try {
      const {data} = await axios.get(
        `${process.env.REACT_APP_API}/call?page=${page}&limit=${limit}&sortBy=firstName&sortOrder=1&willBeCalled=true&callDate=today`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      dispatch({type: 'UPDATE_PAST_CALLS', data});
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };
  const COLUMNS = [
    {
      Header: 'Tarih',
      accessor: 'createdAt',
      Cell: ({value}) => {
        return formatDate(value);
      },
    },
    {
      Header: 'Müşteri',
      accessor: 'customer[0]',
      Cell: ({value}) => {
        const {firstName, lastName} = value;
        return <span>{`${firstName} ${lastName}`}</span>;
      },
      Filter: ColumnFilter,
    },
    {
      Header: 'Telefon 1',
      accessor: 'customer[0].phone1',
    },
    {
      Header: 'Telefon 2',
      accessor: 'customer[0].phone2',
    },
    {
      Header: 'Telefon 3',
      accessor: 'customer[0].phone3',
    },
    {
      Header: 'Açıklama',
      accessor: 'log',
    },
    {
      Header: 'Agent',
      accessor: 'user[0]',
      Cell: ({value}) => {
        const {firstName, lastName} = value;
        return <span>{`${firstName} ${lastName}`}</span>;
      },
    },
  ];

  if (isFetching) return <LoadingSpinner />;

  return (
    <Container className="px-0">
      <FilteringTable
        columns={COLUMNS}
        data={calls.list}
        //handleClickDetails={handleClickDetails}
      />

      <Pagination
        handleClickPage={handleClickPage}
        totalPages={calls.totalPages}
        currentPage={calls.currentPage - 1}
      />
    </Container>
  );
}

export default CallHistory;
