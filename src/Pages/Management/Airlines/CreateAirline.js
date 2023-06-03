import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import PageWrapper from '../../../Components/PageWrapper';
import AirlineForm from './AirlineForm';

function CreateAirline() {
  const navigate = useNavigate();
  return (
    <PageWrapper title="Create Airline | Management">
      <AirlineForm />
    </PageWrapper>
  );
}

export default CreateAirline;
