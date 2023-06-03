import React, {useState} from 'react';
import PageWrapper from '../../../Components/PageWrapper';
import {Routes, Route, useNavigate} from 'react-router-dom';
import {Button, Container} from 'react-bootstrap';

import './Style/Users.css';
import ListUsers from './ListUsers';
import CreateUser from './CreateUser';
import UserDetails from './UserDetails';

function Users() {
  return (
    <PageWrapper title={'Users | Management'}>
      <Routes>
        <Route path="/" element={<ListUsers />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/:id" element={<UserDetails />} />
      </Routes>
    </PageWrapper>
  );
}

export default Users;
