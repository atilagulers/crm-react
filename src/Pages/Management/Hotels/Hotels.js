import React, {useEffect} from 'react';
import PageWrapper from '../../../Components/PageWrapper';
import {Form, Button, Container, Row, Col, Table, Nav} from 'react-bootstrap';
import {Routes, Route, useNavigate} from 'react-router-dom';

import CreateHotel from './CreateHotel';
import ListHotels from './ListHotels';

function Hotels() {
  const navigate = useNavigate();

  const handleClickCreate = () => {
    navigate('create');
  };

  const handleClickList = () => {
    navigate('/management/hotels');
  };
  return (
    <PageWrapper title={'Hotels | Management'}>
      <Container className="p-3 px-0 my-3">
        <Button onClick={handleClickList} className="me-3">
          Otelleri Listele
        </Button>
        <Button onClick={handleClickCreate}>Otel Oluştur</Button>
      </Container>
      <Routes>
        <Route path="/" element={<ListHotels />} />
        <Route path="/create" element={<CreateHotel />} />
      </Routes>
    </PageWrapper>
  );
}

export default Hotels;
