import React, {useContext, useEffect, useState} from 'react';
import PageWrapper from '../../../Components/PageWrapper';
import {Container, Row, Col, Table} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {AppContext} from '../../../Contexts/AppContext';
import './Style/Users.css';
import LoadingSpinner from '../../../Components/LoadingSpinner';

function UserDetails() {
  const {state} = useContext(AppContext);
  const {id: userId} = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchUser = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      };

      const {data} = await axios.get(
        `${process.env.REACT_APP_API}/user/${userId}`,
        config
      );

      setUser(data);
    };
    fetchUser();

    return () => {
      source.cancel();
    };
  }, []);

  if (!user) return <LoadingSpinner />;
  return (
    <PageWrapper title="User Details | Management">
      <Container className=" p-0 bg-light-dark " style={{margin: '0% auto'}}>
        <Container className="p-3 bg-primary">
          <h3>{'Kullanıcı Detayları'}</h3>
        </Container>

        <Table striped hover borderless>
          <tbody>
            {[
              {label: 'Adı', value: user.firstName},
              {label: 'Soyadı', value: user.lastName},
              {label: 'Kullanıcı Adı', value: user.username},
              {label: 'Rol', value: user.role},
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

export default UserDetails;
