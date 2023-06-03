import React, {useEffect} from 'react';
import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import HotelForm from './HotelForm';
import PageWrapper from '../../../Components/PageWrapper';

function CreateHotel() {
  return (
    <PageWrapper title="Create Hotel | Management">
      <HotelForm />
    </PageWrapper>
  );
}

export default CreateHotel;
