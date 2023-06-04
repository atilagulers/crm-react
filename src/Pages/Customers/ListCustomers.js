import React, {useEffect} from 'react';
import {Container, Form, Row, Col, Table, Button} from 'react-bootstrap';
import {Routes, Route, useNavigate} from 'react-router-dom';
import CustomerTable from './CustomerTable';

function ListCustomers() {
  const navigate = useNavigate();

  const customers = [
    {
      id: 0,
      name: 'John',
      surname: 'Doe',
      phone: '1234567890',
      email: 'john.doe@example.com',
      group: 'Yetişkin',
    },
    {
      id: 1,
      name: 'Jane',
      surname: 'Smith',
      phone: '9876543210',
      email: 'jane.smith@example.com',
      group: 'Yetişkin',
    },
    {
      id: 2,
      name: 'Michael',
      surname: 'Johnson',
      phone: '5555555555',
      email: 'michael.johnson@example.com',
      group: 'Yetişkin',
    },
    {
      id: 3,
      name: 'Emily',
      surname: 'Williams',
      phone: '1111111111',
      email: 'emily.williams@example.com',
      group: 'Yetişkin',
    },
  ];

  const handleClickCreateCustomer = () => {
    navigate('create');
  };
  const handleClickCreateGroup = () => {
    navigate('create-group');
  };

  const handleClickListGroups = () => {
    navigate('customer-groups');
  };

  return (
    <Container className="p-0">
      <Container className="p-3 px-0">
        <Button onClick={handleClickCreateCustomer} className="me-3">
          Müşteri Oluştur
        </Button>
        <Button onClick={handleClickCreateGroup} className="me-3">
          Müşteri Grubu Oluştur
        </Button>
        <Button onClick={handleClickListGroups} className="me-3">
          Müşteri Gruplarını Listele
        </Button>
      </Container>
      <CustomerTable customers={customers} />
    </Container>
  );
}

export default ListCustomers;
