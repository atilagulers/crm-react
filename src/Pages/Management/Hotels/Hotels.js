import React, {useEffect} from 'react';
import PageWrapper from '../../../Components/PageWrapper';
import {Form, Button, Container, Row, Col, Table, Nav} from 'react-bootstrap';
import {Routes, Route} from 'react-router-dom';

import CreateHotel from './CreateHotel';
import ListHotels from './ListHotels';

function Hotels() {
  return (
    <PageWrapper title={'Hotels | Management'}>
      <Routes>
        <Route path="/" element={<ListHotels />} />
        <Route path="/create" element={<CreateHotel />} />
      </Routes>
    </PageWrapper>
  );
}

export default Hotels;
