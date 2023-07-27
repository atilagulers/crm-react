import React, {useEffect, useState, useContext} from 'react';
import {Container} from 'react-bootstrap';
//import CustomerTable from './CustomerTable';
import {AppContext} from '../../Contexts/AppContext';
import axios from 'axios';
import LoadingSpinner from '../../Components/LoadingSpinner';
import Pagination from '../../Components/Pagination';
import CustomerTable from '../../Components/CustomerTable';
import {useNavigate} from 'react-router-dom';

function ListCustomers() {
  const {state, dispatch} = useContext(AppContext);
  const customers = state.customers;
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(true);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const limit = 50;

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
      Header: 'Grup',
      accessor: (row) => {
        return row.customerGroup?.[0]?.name ?? '';
      },
    },
  ];

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchCustomers = async () => {
      //if (customers.list.length > 0) return setIsFetching(false);

      setIsFetching(true);
      try {
        const {data} = await axios.get(
          `${process.env.REACT_APP_API}/customer?page=${customers.currentPage}&limit=${limit}&sortBy=firstName&sortOrder=1`,
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
            cancelToken: source.token,
          }
        );

        dispatch({type: 'UPDATE_CUSTOMERS', data});
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

  const handleSelectUser = async (userId, customerId) => {
    setIsUpdatingUser(true);

    try {
      const source = axios.CancelToken.source();
      const config = {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      };
      const body = {
        user: userId,
      };
      await axios.patch(
        `${process.env.REACT_APP_API}/customer/${customerId}`,
        body,
        config
      );

      const {data} = await axios.get(
        `${process.env.REACT_APP_API}/customer?page=${customers.currentPage}&limit=${limit}&sortBy=firstName&sortOrder=1`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
          cancelToken: source.token,
        }
      );

      dispatch({type: 'UPDATE_CUSTOMERS', data});

      return () => {
        source.cancel();
      };
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdatingUser(false);
    }
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

      dispatch({type: 'UPDATE_CUSTOMERS', data});
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleClickDetails = (customerId) => {
    navigate(`/customers/${customerId}`);
  };

  if (isFetching || isUpdatingUser) return <LoadingSpinner />;

  return (
    <Container className="p-0">
      {/*<CustomerTable
        customers={customers.list}
        handleSelectUser={handleSelectUser}
      />*/}
      <CustomerTable
        columns={COLUMNS}
        data={customers.list}
        handleClickDetails={handleClickDetails}
        handleSelectUser={handleSelectUser}
      />
      <Pagination
        handleClickPage={handleClickPage}
        totalPages={customers.totalPages}
        currentPage={customers.currentPage - 1}
      />
    </Container>
  );
}

export default ListCustomers;
