import React, {useEffect} from 'react';
import {Table} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

function CustomerTable({customers}) {
  const navigate = useNavigate();

  const handleClickRow = (customerId) => {
    navigate(`${customerId}`);
  };

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
          <th>Grup</th>
        </tr>
      </thead>
      <tbody>
        {customers &&
          customers.map((customer, i) => {
            return (
              <tr onClick={() => handleClickRow(customer.id)} key={i}>
                <td>{customer.name}</td>
                <td>{customer.surname}</td>
                <td>{customer.phone}</td>
                <td>{customer.email}</td>
                <td>{customer.group}</td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
}

export default CustomerTable;
