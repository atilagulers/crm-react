import React from 'react';
import PageWrapper from '../../../Components/PageWrapper';
import {Route, Routes, useNavigate} from 'react-router-dom';
import {Container, Button} from 'react-bootstrap';
import ListAirlines from './ListAirlines';
import CreateAirline from './CreateAirline';
import AirlineDetails from './AirlineDetails';
import EditAirline from './EditAirline';

function Airlines() {
  const navigate = useNavigate();

  const handleClickCreate = () => {
    navigate('create');
  };
  const handleClickList = () => {
    navigate('/management/airlines');
  };
  return (
    <PageWrapper title={'Airlines | Management'}>
      {/*<Container className="p-3 px-0 my-3">
        <Button onClick={handleClickList} className="me-3">
          Havayollarını Listele
        </Button>
        <Button onClick={handleClickCreate}>Havayolu Oluştur</Button>
      </Container>*/}
      <Routes>
        <Route path="/" element={<ListAirlines />} />
        <Route path="/create" element={<CreateAirline />} />
        <Route path="/:id" element={<AirlineDetails />} />
        <Route path="/:id/edit" element={<EditAirline />} />
      </Routes>
    </PageWrapper>
  );
}

export default Airlines;
