import React, {useEffect} from 'react';
import {Table} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

function HotelTable({hotels}) {
  const navigate = useNavigate();

  const handleClickRow = (hotelId) => {
    navigate(`${hotelId}`);
  };

  return (
    <Table
      className="table hotel-table table-striped table-dark table-hover"
      striped
      bordered
      hover
      variant="dark"
    >
      <thead>
        <tr className="table-dark">
          <th>Otel Adı</th>
          <th>Yetkili Kişi</th>
          <th>Telefon</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {hotels &&
          hotels.map((hotel, i) => {
            return (
              <tr onClick={() => handleClickRow(hotel._id)} key={i}>
                <td>{hotel.name}</td>
                <td>{hotel.responsible}</td>
                <td>{hotel.phone}</td>
                <td>{hotel.email}</td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
}

export default HotelTable;
