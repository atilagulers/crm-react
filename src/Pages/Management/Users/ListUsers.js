import React from 'react';
import {Container} from 'react-bootstrap';
import UserTable from './UserTable';

function ListUsers() {
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

  return (
    <Container className="p-0">
      <UserTable users={users} />
    </Container>
  );
}

export default ListUsers;
