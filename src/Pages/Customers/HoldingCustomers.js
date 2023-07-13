import React, {useEffect, useContext, useState} from 'react';
import {Table, Container, Form, Button} from 'react-bootstrap';
import {AppContext} from '../../Contexts/AppContext';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import LoadingSpinner from '../../Components/LoadingSpinner';
import {toast} from 'react-toastify';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleInfo} from '@fortawesome/free-solid-svg-icons';
import Pagination from '../../Components/Pagination';

function HoldingCustomers() {
  const {state, dispatch} = useContext(AppContext);
  const customers = state.holdingCustomers;
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState();
  const [isSaving, setIsSaving] = useState(false);
  const [callDate, setCallDate] = useState(Date.now());
  const limit = 20;

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

  const handleClickDate = async (e, customerId) => {
    e.preventDefault();

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
      console.log(data);
      toast.success(`${data.firstName} müşterisi arama listesine eklendi.`);
    } catch (error) {
      toast.error(`Müşteri Güncellenemedi. ${error}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClickRow = (customerId) => {
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
            <th>Telefon</th>
            <th>Agent</th>
            <th>Tarih</th>
          </tr>
        </thead>
        <tbody>
          {customers.list &&
            customers.list.map((customer, i) => {
              return (
                <tr key={customer._id}>
                  <td onClick={(e) => handleClickRow(customer._id)}>
                    <FontAwesomeIcon className="p-2" icon={faCircleInfo} />
                  </td>
                  <td>{customer.firstName}</td>
                  <td>{customer.lastName}</td>
                  <td>{customer.phone1}</td>
                  <td>
                    {customer.user[0].firstName} {customer.user[0].lastName}
                  </td>

                  <td className="col-3" style={{maxWidth: '100px'}}>
                    <Form>
                      <Form.Group
                        className="d-flex gap-5"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          name="date"
                          type="date"
                          onChange={(e) => setCallDate(e.target.value)}
                          max="2023-12-31"
                        />
                        <Button
                          onClick={(e) => handleClickDate(e, customer._id)}
                          className="py-0"
                        >
                          Kaydet
                        </Button>
                      </Form.Group>
                    </Form>
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
