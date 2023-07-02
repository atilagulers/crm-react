import React, {useState, useEffect, useContext} from 'react';
import {Table, Dropdown, Container} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import CallEntryModal from './CallEntryModal';
import {AppContext} from '../../Contexts/AppContext';
import axios from 'axios';

function CallTable({customers}) {
  const {state} = useContext(AppContext);
  const navigate = useNavigate();
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [users, setUsers] = useState([]);
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

  const handleClickRow = (e, customerId) => {
    //navigate(`/customers/${customerId}`);
  };

  const handleClickCallEntry = (e, customerId) => {
    setShowEntryModal(true);
  };

  const handleChangeUser = (e, customerId) => {};

  const handleChangeHotels = (e, hotelId) => {};

  return (
    <Container className="px-0">
      <Table
        className="table call-table table-striped table-dark table-hover"
        striped
        bordered
        hover
        variant="dark"
      >
        {/*Modal of entity form*/}
        <CallEntryModal show={showEntryModal} setShow={setShowEntryModal} />

        <thead>
          <tr className="table-dark">
            <th>+</th>
            <th>Adı</th>
            <th>Soyadı</th>
            <th>Telefon 1</th>
            <th>Telefon 2</th>
            <th>Telefon 3</th>
            <th>Email</th>
            <th>Agent</th>
            {/*<th>Otel</th>*/}
            <th>Grup</th>
          </tr>
        </thead>

        <tbody>
          {customers &&
            customers.map((customer, i) => {
              return (
                <tr onClick={(e) => handleClickRow(e, customer.id)} key={i}>
                  <td onClick={(e) => handleClickCallEntry(e, customer.id)}>
                    +
                  </td>
                  <td>{customer.firstName}</td>
                  <td>{customer.lastName}</td>
                  <td>{customer.phone1}</td>
                  <td>{customer.phone2}</td>
                  <td>{customer.phone3}</td>
                  <td>{customer.email}</td>
                  <td>{`${customer.user[0].firstName} ${customer.user[0].lastName}`}</td>

                  <td>{customer.customerGroup[0]?.name}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Container>
  );
}

export default CallTable;
