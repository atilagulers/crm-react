import React, {useEffect} from 'react';
import {Table} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

function AirlineTable({airlines}) {
  const navigate = useNavigate();

  const handleClickRow = (airlineId) => {
    navigate(`${airlineId}`);
  };

  return (
    <Table
      className="table game-table table-striped table-dark table-hover"
      striped
      bordered
      hover
      variant="dark"
    >
      <thead>
        <tr className="table-dark">
          <th>Havayolu Adı</th>
        </tr>
      </thead>
      <tbody>
        {airlines &&
          airlines.map((airline, i) => {
            return (
              <tr onClick={() => handleClickRow(airline.id)} key={i}>
                <td>{airline.name}</td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
}

export default AirlineTable;
