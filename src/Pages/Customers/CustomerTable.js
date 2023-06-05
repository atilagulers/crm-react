import React, {useState} from 'react';
import {Table, Dropdown} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

function CustomerTable({customers}) {
  const navigate = useNavigate();
  const [selectedHotels, setSelectedHotels] = useState([]);

  const handleClickRow = (e, customerId) => {
    if (e.target.tagName !== 'TD') return;
    if (
      e.target.getAttribute('data-field') === 'agent' ||
      e.target.getAttribute('data-field') === 'hotel'
    )
      return;

    navigate(`${customerId}`);
  };
  const handleChangeAgent = (e, customerId) => {};

  const handleChangeHotels = (e, hotelId) => {};

  return (
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
          <th>Agent</th>
          <th>Otel</th>
          <th>Grup</th>
        </tr>
      </thead>
      <tbody>
        {customers &&
          customers.map((customer, i) => {
            return (
              <tr onClick={(e) => handleClickRow(e, customer.id)} key={i}>
                <td>{customer.name}</td>
                <td>{customer.surname}</td>
                <td>{customer.phone}</td>
                <td>{customer.email}</td>
                <td data-field="agent">
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="secondary"
                      id={`agent-dropdown-${customer.id}`}
                      style={{width: '100%'}}
                    >
                      {customer.agent}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={(e) => handleChangeAgent(e, customer.id)}
                        active={customer.agent === 'Burak Kaya'}
                      >
                        Burak Kaya
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={(e) => handleChangeAgent(e, customer.id)}
                        active={customer.agent === 'Ferdi Caner'}
                      >
                        Ferdi Caner
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td data-field="hotel">
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
                </td>
                <td>{customer.group}</td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
}

export default CustomerTable;
