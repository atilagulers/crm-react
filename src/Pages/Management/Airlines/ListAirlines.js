import React, {useEffect} from 'react';
import {Container, Form, Row, Col, Table, Button} from 'react-bootstrap';
import {Routes, Route, useNavigate} from 'react-router-dom';
import AirlineTable from './AirlineTable';

function ListAirlines() {
  const navigate = useNavigate();

  const airlines = [
    {
      id: 0,
      name: 'Turkish Airlines',
    },
    {
      id: 1,
      name: 'Pegasus',
    },
    {
      id: 2,
      name: 'SunExpress',
    },
  ];

  const handleClickCreate = () => {
    navigate('create');
  };

  return (
    <Container className="p-0">
      <Container className="p-3 px-0">
        <Button onClick={handleClickCreate}>Havayolu Oluştur</Button>
      </Container>
      <AirlineTable airlines={airlines} />
    </Container>
  );
}

export default ListAirlines;
