import React, {useContext, useEffect, useState} from 'react';
import PageWrapper from '../../../Components/PageWrapper';
import {Container, Row, Col, Table} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {AppContext} from '../../../Contexts/AppContext';
import LoadingSpinner from '../../../Components/LoadingSpinner';

function GameDetails() {
  const {state} = useContext(AppContext);
  const {id: gameId} = useParams();
  const [game, setGame] = useState();

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchGame = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      };

      const {data} = await axios.get(
        `${process.env.REACT_APP_API}/game/${gameId}`,
        config
      );

      setGame(data);
    };
    fetchGame();

    return () => {
      source.cancel();
    };
  }, []);

  if (!game) return <LoadingSpinner />;
  return (
    <PageWrapper title="User Details | Management">
      <Container className=" p-0 bg-light-dark " style={{margin: '0% auto'}}>
        <Container className="p-3 bg-primary">
          <h3>{'Oyun Detayları'}</h3>
        </Container>

        <Table striped hover borderless>
          <tbody>
            {[{label: 'Oyun Adı', value: game.name}].map((item) => (
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

export default GameDetails;
