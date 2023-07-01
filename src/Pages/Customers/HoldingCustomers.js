import React, {useEffect, useContext, useState} from 'react';
import {Table, Container, Form, Button} from 'react-bootstrap';
import {AppContext} from '../../Contexts/AppContext';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function HoldingCustomers() {
  const {state} = useContext(AppContext);
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [isFetching, setIsFetching] = useState();

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchCustomers = async () => {
      //if (customers.length > 0) return setIsFetching(false);

      setIsFetching(true);
      try {
        const {data} = await axios.get(
          `${process.env.REACT_APP_API}/customer/?page=1&limit=9999&willBeCalled=true`,
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
  }, []);

  const handleClickRow = (customerId) => {
    navigate(`/customers/${customerId}`);
  };

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
            <th>Adı</th>
            <th>Soyadı</th>
            <th>Telefon</th>

            <th>Agent</th>

            <th>Aranacağı Tarih</th>
          </tr>
        </thead>
        <tbody>
          {customers &&
            customers.map((customer, i) => {
              return (
                <tr key={customer._id}>
                  <td onClick={() => handleClickRow(customer._id)}>
                    {customer.firstName}
                  </td>
                  <td onClick={() => handleClickRow(customer._id)}>
                    {customer.lastName}
                  </td>
                  <td onClick={() => handleClickRow(customer._id)}>
                    {customer.phone1}
                  </td>
                  <td onClick={() => handleClickRow(customer._id)}>
                    {customer.user[0].firstName} {customer.user[0].lastName}
                  </td>

                  <td style={{maxWidth: '100px'}}>
                    <Form>
                      <Form.Group
                        className="d-flex gap-5"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control name="date" type="date" />
                        <Button className="py-0">Kaydet</Button>
                      </Form.Group>
                    </Form>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Container>
  );
}

export default HoldingCustomers;
