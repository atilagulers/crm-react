import React, {useEffect, useContext, useState} from 'react';
import {Container} from 'react-bootstrap';
import {AppContext} from '../../Contexts/AppContext';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import LoadingSpinner from '../../Components/LoadingSpinner';
import {toast} from 'react-toastify';

import Pagination from '../../Components/Pagination';
import HoldingCustomerTable from '../../Components/HoldingCustomerTable';

function HoldingCustomers() {
  const {state, dispatch} = useContext(AppContext);
  const customers = state.holdingCustomers;
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState();
  const [isSaving, setIsSaving] = useState(false);
  const [callDate, setCallDate] = useState('');
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
          `${process.env.REACT_APP_API}/customer/?page=${customers.currentPage}&limit=${limit}&willBeCalled=false&sortBy=createdAt&sortOrder=1`,
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
  }, [isSaving, customers.currentPage, dispatch, state.token]);

  const handleClickSave = async (e, customerId) => {
    e.preventDefault();

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const selectedDate = new Date(callDate);
    selectedDate.setHours(0, 0, 0, 0);

    if (isNaN(selectedDate.getTime())) {
      setCallDate('');
      toast.error('Lütfen geçerli bir tarih giriniz.');
      return;
    } else if (selectedDate < currentDate) {
      setCallDate('');
      toast.error('Arama tarihi geçmiş olmaz.');
      return;
    }
    setIsSaving(true);

    try {
      const body = {
        willBeCalled: true,
        callDate,
      };

      const {data} = await axios.patch(
        `${process.env.REACT_APP_API}/customer/${customerId}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      toast.success(
        `${data.firstName} ${data.lastName} müşterisi arama listesine eklendi.`
      );
    } catch (error) {
      toast.error(`Müşteri Güncellenemedi. ${error}`);
    } finally {
      setCallDate('');
      setIsSaving(false);
    }
  };

  const handleClickDetails = (customerId) => {
    navigate(`/customers/${customerId}`);
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
      <HoldingCustomerTable
        columns={COLUMNS}
        data={customers.list}
        handleClickDetails={handleClickDetails}
        handleClickSave={handleClickSave}
        setCallDate={setCallDate}
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
