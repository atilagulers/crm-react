import React, {useEffect, useContext, useState} from 'react';
import {Table, Container, Button} from 'react-bootstrap';
import {AppContext} from '../../Contexts/AppContext';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import LoadingSpinner from '../../Components/LoadingSpinner';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleInfo} from '@fortawesome/free-solid-svg-icons';
import Pagination from '../../Components/Pagination';

function HoldingCustomers() {
  const {state, dispatch} = useContext(AppContext);
  const navigate = useNavigate();
  const customers = state.holdingCustomers;
  const [isFetching, setIsFetching] = useState();
  const limit = 20;

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
            <th>Telefon 2</th>
            <th>Telefon 3</th>
            <th>Agent</th>
            <th>Rezervasyon</th>
          </tr>
        </thead>
        <tbody>
          {customers.list &&
            customers.list.map((customer, i) => {
              return (
                <tr key={customer._id}>
                  <td onClick={(e) => handleClickDetails(customer._id)}>
                    <FontAwesomeIcon className="p-2" icon={faCircleInfo} />
                  </td>

                  <td>{customer.firstName}</td>
                  <td>{customer.lastName}</td>
                  <td>{customer.phone1}</td>
                  <td>{customer.phone2}</td>
                  <td>{customer.phone3}</td>

                  <td>
                    {customer.user[0].firstName} {customer.user[0].lastName}
                  </td>
                  <td>
                    <Button
                      onClick={() =>
                        handleClickCreate(
                          customer.phone1 || customer.phone2 || customer.phone3
                        )
                      }
                      style={{width: '100%'}}
                    >
                      Oluştur
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <Pagination
        handleClickPage={handleClickPage}
        totalPages={customers.totalPages}
        currentPage={customers.currentPage - 1}
      />
    </Container>
  );
}

export default HoldingCustomers;
