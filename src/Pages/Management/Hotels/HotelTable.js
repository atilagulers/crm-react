import {Table} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleInfo} from '@fortawesome/free-solid-svg-icons';

function HotelTable({hotels}) {
  const navigate = useNavigate();

  const handleClickHotel = (hotelId) => {
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
          <th style={{width: '5%'}}>Detay</th>
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
              <tr key={i}>
                <td onClick={(e) => handleClickHotel(hotel._id)}>
                  <FontAwesomeIcon className="p-2" icon={faCircleInfo} />
                </td>
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
