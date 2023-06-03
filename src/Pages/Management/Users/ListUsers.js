import React, {useEffect} from 'react';
import {Container, Form, Row, Col, Table, Button} from 'react-bootstrap';
import {Routes, Route, useNavigate} from 'react-router-dom';
import UserTable from './UserTable';

function ListUsers() {
  const navigate = useNavigate();
  const users = [
    {
      id: 0,
      name: 'Atila',
      lastName: 'Güler',
      username: 'atilaguler',
    },
    {
      id: 1,
      name: 'Can',
      lastName: 'Koçoğlu',
      username: 'cankoc',
    },
    {
      id: 2,
      name: 'Hakan',
      lastName: 'Yılmaz',
      username: 'hakanylmz',
    },
    {
      id: 3,
      name: 'Ahmet',
      lastName: 'Tosun',
      username: 'ahmetsn',
    },
  ];

  const handleClickCreate = () => {
    navigate('create');
  };

  return (
    <Container className="p-0">
      <Container className="p-3 px-0">
        <Button onClick={handleClickCreate}>Kullanıcı Oluştur</Button>
      </Container>
      <UserTable users={users} />
    </Container>
  );
}

export default ListUsers;
