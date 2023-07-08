import React, {useEffect, useContext, useState} from 'react';
import {Table, Container, Form, Button} from 'react-bootstrap';
import {AppContext} from '../../Contexts/AppContext';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import LoadingSpinner from '../../Components/LoadingSpinner';
import {toast} from 'react-toastify';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleInfo} from '@fortawesome/free-solid-svg-icons';

function HoldingReservations() {
  const {state} = useContext(AppContext);
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [isFetching, setIsFetching] = useState();
  const [isSaving, setIsSaving] = useState(false);
  const [callDate, setCallDate] = useState(Date.now());
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 20;

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchCustomers = async () => {
      setIsFetching(true);
      try {
        const {data} = await axios.get(
          `${process.env.REACT_APP_API}/customer/?page=${currentPage}&limit=${limit}&willBeCalled=false&sortBy=createdAt&sortOrder=1`,
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
            cancelToken: source.token,
          }
        );

        setCustomers(data.customers);
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
  }, [isSaving]);

  const handleClickRow = (customerId) => {
    navigate(`/customers/${customerId}`);
  };

  if (isFetching) return <LoadingSpinner />;
  return (
    <Container className="px-0">
      <Table
        className="table customer-table table-striped table-dark table-hover"
        striped
        bordered
        hover
        variant="dark"
      >
        <thead>
          <tr className="table-dark">
            <th style={{width: '5%'}}>Detay</th>
            <th>Adı</th>
            <th>Soyadı</th>
            <th>Telefon 1</th>

            <th>Agent</th>
          </tr>
        </thead>
        <tbody>
          {customers &&
            customers.map((customer, i) => {
              return (
                <tr key={customer._id}>
                  <td onClick={(e) => handleClickRow(e, customer._id)}>
                    <FontAwesomeIcon className="p-2" icon={faCircleInfo} />
                  </td>

                  <td>{customer.firstName}</td>
                  <td>{customer.lastName}</td>
                  <td>{customer.phone1}</td>

                  <td>
                    {customer.user[0].firstName} {customer.user[0].lastName}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Container>
  );
}

export default HoldingReservations;
