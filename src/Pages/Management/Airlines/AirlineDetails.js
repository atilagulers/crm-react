import React, {useContext, useEffect, useState} from 'react';
import PageWrapper from '../../../Components/PageWrapper';
import {Container, Row, Col, Table} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {AppContext} from '../../../Contexts/AppContext';
import LoadingSpinner from '../../../Components/LoadingSpinner';

function AirlineDetails() {
  const {state} = useContext(AppContext);
  const {id: airlineId} = useParams();
  const [airline, setAirline] = useState();

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchHotel = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      };

      const {data} = await axios.get(
        `${process.env.REACT_APP_API}/airline/${airlineId}`,
        config
      );

      setAirline(data);
    };
    fetchHotel();

    return () => {
      source.cancel();
    };
  }, []);

  if (!airline) return <LoadingSpinner />;
  return (
    <PageWrapper title="User Details | Management">
      <Container className=" p-0 bg-light-dark " style={{margin: '0% auto'}}>
        <Container className="p-3 bg-primary">
          <h3>{'Havayolu Detayları'}</h3>
        </Container>

        <Table striped hover borderless>
          <tbody>
            {[{label: 'Havayolu Adı', value: airline.name}].map((item) => (
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

export default AirlineDetails;
