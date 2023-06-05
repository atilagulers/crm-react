import React from 'react';
import {Container} from 'react-bootstrap';
import AirlineTable from './AirlineTable';

function ListAirlines() {
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

  return (
    <Container className="p-0">
      <AirlineTable airlines={airlines} />
    </Container>
  );
}

export default ListAirlines;
