import React, {useEffect, useContext, useState} from 'react';
import {Table, Container, Button} from 'react-bootstrap';
import {AppContext} from '../../Contexts/AppContext';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import LoadingSpinner from '../../Components/LoadingSpinner';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleInfo} from '@fortawesome/free-solid-svg-icons';
import Pagination from '../../Components/Pagination';
import HoldingReservationsTable from '../../Components/HoldingReservationsTable';

function HoldingCustomers() {
  const {state, dispatch} = useContext(AppContext);
  const navigate = useNavigate();
  const customers = state.holdingCustomers;
  const [isFetching, setIsFetching] = useState();
  const limit = 20;

  const COLUMNS = [
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
      Header: 'Agent',
      accessor: 'user[0]',
      Cell: ({value}) => {
        const {firstName, lastName} = value;
        return <span>{`${firstName} ${lastName}`}</span>;
      },
    },
  ];

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchCustomers = async () => {
      setIsFetching(true);
      try {
        const {data} = await axios.get(
          `${process.env.REACT_APP_API}/customer/?page=${customers.currentPage}&limit=${limit}&waitingReservation=true&sortBy=createdAt&sortOrder=1`,
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
            cancelToken: source.token,
          }
        );

        dispatch({type: 'UPDATE_HOLDING_CUSTOMERS', data});
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

  const handleClickDetails = (customerId) => {
    navigate(`/customers/${customerId}`);
  };

  const handleClickCreate = (customerPhone) => {
    navigate(`/reservations/create?customerPhone=${customerPhone}`);
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
      dispatch({type: 'UPDATE_HOLDING_CUSTOMERS', data});
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  if (isFetching) return <LoadingSpinner />;

  return (
    <Container className="px-0">
      <HoldingReservationsTable
        columns={COLUMNS}
        data={customers.list}
        handleClickDetails={handleClickDetails}
        handleClickCreate={handleClickCreate}
      />

      <Pagination
        handleClickPage={handleClickPage}
        totalPages={customers.totalPages}
        currentPage={customers.currentPage - 1}
      />
    </Container>
  );
}

export default HoldingCustomers;
