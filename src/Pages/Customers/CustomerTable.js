import React, {useState, useContext, useEffect} from 'react';
import {Table, Dropdown, Container} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {AppContext} from '../../Contexts/AppContext';
import axios from 'axios';

function CustomerTable({customers}) {
  const {state} = useContext(AppContext);

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [selectedHotels, setSelectedHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchUsers = async () => {
      //if (customers.length > 0) return setIsLoading(false);

      setIsLoading(true);
      try {
        const {data} = await axios.get(
          `${process.env.REACT_APP_API}/user/?page=1&limit=9999`,
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
            cancelToken: source.token,
          }
        );

        setUsers(data.users);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();

    return () => {
      source.cancel();
    };
  }, []);

  const handleClickRow = (e, customerId) => {
    if (e.target.tagName !== 'TD') return;
    if (
      e.target.getAttribute('data-field') === 'user' ||
      e.target.getAttribute('data-field') === 'hotel'
    )
      return;

    navigate(`/customers/${customerId}`);
  };
  const handleChangeUser = (e, customerId) => {};

  const handleChangeHotels = (e, hotelId) => {};

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
            <th>Email</th>
            <th>user</th>
            {/*<th>Otel</th>*/}
            <th>Grup</th>
          </tr>
        </thead>
        <tbody>
          {customers &&
            customers.map((customer, i) => {
              return (
                <tr onClick={(e) => handleClickRow(e, customer.id)} key={i}>
                  <td>{customer.firstName}</td>
                  <td>{customer.lastName}</td>
                  <td>{customer.phone1}</td>
                  <td>{customer.email}</td>
                  <td data-field="user">
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="secondary"
                        id={`user-dropdown-${customer.id}`}
                        style={{width: '100%'}}
                      >
                        {customer.user[0]?.firstName}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {users?.map((agent) => {
                          return (
                            <Dropdown.Item
                              key={agent._id}
                              onClick={(e) => handleChangeUser(e, customer.id)}
                              active={customer.user === 'Burak Kaya'}
                            >
                              {`${agent.firstName} ${agent.lastName}`}
                            </Dropdown.Item>
                          );
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                  {/*<td data-field="hotel">
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="secondary"
                      id="hotel-dropdown"
                      style={{width: '100%'}}
                    >
                      {selectedHotels.length > 0
                        ? `${selectedHotels.length} otel seçildi`
                        : 'Otel Seçin'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {customer.hotels.map((hotel, index) => (
                        <Dropdown.Item
                          key={index}
                          onClick={() => handleChangeHotels(hotel)}
                          active={selectedHotels.includes(hotel)}
                        >
                          {hotel}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </td>*/}
                  <td>{customer.group}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Container>
  );
}

export default CustomerTable;
