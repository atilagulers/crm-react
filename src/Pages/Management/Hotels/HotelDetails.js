import React, {useContext, useEffect, useState} from 'react';
import PageWrapper from '../../../Components/PageWrapper';
import {Container, Row, Col, Table} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {AppContext} from '../../../Contexts/AppContext';
import LoadingSpinner from '../../../Components/LoadingSpinner';

function HotelDetails() {
  const {state} = useContext(AppContext);
  const {id: hotelId} = useParams();
  const [hotel, setHotel] = useState();

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchHotel = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      };

      const {data} = await axios.get(
        `${process.env.REACT_APP_API}/hotel/${hotelId}`,
        config
      );

      setHotel(data);
    };
    fetchHotel();

    return () => {
      source.cancel();
    };
  }, []);

  if (!hotel) return <LoadingSpinner />;
  return (
    <PageWrapper title="User Details | Management">
      <Container className=" p-0 bg-light-dark " style={{margin: '0% auto'}}>
        <Container className="p-3 bg-primary">
          <h3>{'Otel Detayları'}</h3>
        </Container>

        <Table striped hover borderless>
          <tbody>
            {[
              {label: 'Otel Adı', value: hotel.name},
              {label: 'Soyadı', value: hotel.responsible},
              {label: 'Kullanıcı Adı', value: hotel.phone},
              {label: 'Rol', value: hotel.email},
            ].map((item) => (
              <tr key={item.label}>
                <td className="col-md-2"> {item.label}:</td>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </PageWrapper>
  );
}

export default HotelDetails;
