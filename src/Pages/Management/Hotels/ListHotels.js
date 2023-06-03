import React, {useEffect} from 'react';
import {Container, Table, Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import HotelTable from './HotelTable';

function ListHotels() {
  const navigate = useNavigate();
  const hotels = [
    {
      id: 0,
      name: 'Hotel A',
      contact: 'John Doe',
      phone: '123-456-7890',
      email: 'john@example.com',
    },
    {
      id: 1,
      name: 'Hotel B',
      contact: 'Jane Smith',
      phone: '987-654-3210',
      email: 'jane@example.com',
    },
    {
      id: 2,
      name: 'Hotel C',
      contact: 'Mike Johnson',
      phone: '555-555-5555',
      email: 'mike@example.com',
    },
    {
      id: 3,
      name: 'Hotel D',
      contact: 'Emily Brown',
      phone: '111-222-3333',
      email: 'emily@example.com',
    },
  ];

  const handleClickCreate = () => {
    navigate('create');
  };
  return (
    <Container className="p-0">
      <Container className="p-3 px-0">
        <Button onClick={handleClickCreate}>Otel Oluştur</Button>
      </Container>

      <HotelTable hotels={hotels} />
    </Container>
  );
}

export default ListHotels;
