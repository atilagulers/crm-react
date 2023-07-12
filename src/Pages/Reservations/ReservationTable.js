import React, {useState, useEffect, useContext} from 'react';
import {Table, Dropdown, Container} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {AppContext} from '../../Contexts/AppContext';
import axios from 'axios';
import {formatDate} from '../../Helpers';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPhoneVolume, faCircleInfo} from '@fortawesome/free-solid-svg-icons';

function ReservationTable({reservations}) {
  const {state} = useContext(AppContext);
  const navigate = useNavigate();
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [users, setUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchUsers = async () => {
      //if (reservations.length > 0) return setIsFetching(false);

      setIsFetching(true);
      try {
        const {data} = await axios.get(
          `${process.env.REACT_APP_API}/user/?page=1&limit=9999`,
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
            cancelToken: source.token,
          }
        );

        setUsers(data.users);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchUsers();

    return () => {
      source.cancel();
    };
  }, []);

  const handleClickDetails = (reservationId) => {
    navigate(`/reservations/${reservationId}`);
  };

  return (
    <Container className="px-0">
      <Table
        className="table call-table table-striped table-dark table-hover"
        striped
        bordered
        hover
        variant="dark"
      >
        <thead>
          <tr className="table-dark">
            <th style={{width: '5%'}}>Detay</th>

            <th>Müşteri</th>
            <th>Otel</th>
            <th>HY</th>
            <th>Tarih</th>
            <th>Saat</th>
            <th>PNR</th>
            <th>HY</th>
            <th>Tarih</th>
            <th>Saat</th>
            <th>PNR</th>
            <th>Agent</th>
          </tr>
        </thead>

        <tbody>
          {reservations &&
            reservations.map((reservation, i) => {
              return (
                <tr key={i}>
                  <td onClick={(e) => handleClickDetails(reservation._id)}>
                    <FontAwesomeIcon className="p-2" icon={faCircleInfo} />
                  </td>

                  <td>{`${reservation.customer[0].firstName} ${reservation.customer[0].lastName}`}</td>
                  <td>{reservation.hotel[0].name}</td>
                  <td>{reservation.departureAirline[0].name}</td>
                  <td>{formatDate(reservation.departureDate)}</td>
                  <td>{reservation.departureTime}</td>
                  <td>{reservation.departurePNR}</td>
                  <td>{reservation.returnAirline[0].name}</td>
                  <td>{formatDate(reservation.returnDate)}</td>
                  <td>{reservation.returnTime}</td>
                  <td>{reservation.returnPNR}</td>
                  <td>{`${reservation.user[0].firstName} ${reservation.user[0].lastName}`}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Container>
  );
}

export default ReservationTable;
