import React, {useState} from 'react';
import PageWrapper from '../../../Components/PageWrapper';
import {Routes, Route, useNavigate} from 'react-router-dom';
import {Button, Container} from 'react-bootstrap';

import './Style/Users.css';
import ListUsers from './ListUsers';
import CreateUser from './CreateUser';
import UserDetails from './UserDetails';

function Users() {
  const navigate = useNavigate();

  const handleClickCreate = () => {
    navigate('create');
  };

  const handleClickList = () => {
    navigate('/management/users');
  };

  return (
    <PageWrapper title={'Users | Management'}>
      <Container className="p-3 px-0 my-3">
        <Button onClick={handleClickList} className="me-3">
          Kullanıcıları Listele
        </Button>
        <Button onClick={handleClickCreate}>Kullanıcı Oluştur</Button>
      </Container>
      <Routes>
        <Route path="/" element={<ListUsers />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/:id" element={<UserDetails />} />
      </Routes>
    </PageWrapper>
  );
}

export default Users;
