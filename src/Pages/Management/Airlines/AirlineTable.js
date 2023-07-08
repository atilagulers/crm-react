import React, {useEffect} from 'react';
import {Table} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleInfo} from '@fortawesome/free-solid-svg-icons';

function AirlineTable({airlines}) {
  const navigate = useNavigate();

  const handleClickAirline = (airlineId) => {
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
          <th style={{width: '5%'}}>Detay</th>
          <th>Havayolu Adı</th>
        </tr>
      </thead>
      <tbody>
        {airlines &&
          airlines.map((airline, i) => {
            return (
              <tr key={i}>
                <td onClick={(e) => handleClickAirline(airline._id)}>
                  <FontAwesomeIcon className="p-2" icon={faCircleInfo} />
                </td>
                <td>{airline.name}</td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
}

export default AirlineTable;
