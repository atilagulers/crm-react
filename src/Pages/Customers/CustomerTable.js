import React, {useState, useContext, useEffect} from 'react';
import {Table, Dropdown, Container} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {AppContext} from '../../Contexts/AppContext';
import axios from 'axios';
import LoadingSpinner from '../../Components/LoadingSpinner';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleInfo} from '@fortawesome/free-solid-svg-icons';

function CustomerTable({customers, handleSelectUser}) {
  const {state} = useContext(AppContext);

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchUsers = async () => {
      //if (customers.length > 0) return setIsFetching(false);

      setIsFetching(true);
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
        setIsFetching(false);
      }
    };
    fetchUsers();

    return () => {
      source.cancel();
    };
  }, []);

  const handleClickCustomer = (customerId) => {
    navigate(`/customers/${customerId}`);
  };

  //if (isFetching) return <LoadingSpinner />;

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
            {/*<th>Otel</th>*/}
            <th>Grup</th>
          </tr>
        </thead>
        <tbody>
          {customers &&
            customers.map((customer, i) => {
              return (
                <tr key={customer._id}>
                  <td onClick={(e) => handleClickCustomer(customer._id)}>
                    <FontAwesomeIcon className="p-2" icon={faCircleInfo} />
                  </td>

                  <td>{customer.firstName}</td>
                  <td>{customer.lastName}</td>
                  <td>{customer.phone1}</td>
                  <td>
                    <Dropdown
                      onSelect={(userId) =>
                        handleSelectUser(userId, customer._id)
                      }
                    >
                      <Dropdown.Toggle
                        variant="primary"
                        id={`user-dropdown-${customer.id}`}
                        style={{width: '100%'}}
                      >
                        {`${customer.user[0]?.firstName} ${customer.user[0]?.lastName}`}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {users?.map((user) => {
                          return (
                            <Dropdown.Item key={user._id} eventKey={user._id}>
                              {`${user.firstName} ${user.lastName}`}
                            </Dropdown.Item>
                          );
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                  <td>{customer.customerGroup[0]?.name}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Container>
  );
}

export default CustomerTable;
