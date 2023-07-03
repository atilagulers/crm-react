import React, {useEffect, useState, useContext} from 'react';
import {Container, Table} from 'react-bootstrap';
import {AppContext} from '../../Contexts/AppContext';
import axios from 'axios';
import LoadingSpinner from '../../Components/LoadingSpinner';
import {formatDate} from '../../Helpers';

function CallHistory() {
  const {state, dispatch} = useContext(AppContext);
  const [calls, setCalls] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchCalls = async () => {
      setIsFetching(true);
      try {
        const {data} = await axios.get(
          `${process.env.REACT_APP_API}/call?page=1&limit=30&sortBy=createdAt&sortOrder=-1`,
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
            cancelToken: source.token,
          }
        );

        dispatch({type: 'UPDATE_FUTURE_CALLS', data});
        setCalls(data.calls);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchCalls();

    return () => {
      source.cancel();
    };
  }, []);

  if (isFetching) return <LoadingSpinner />;
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
            <th>Tarih</th>
            <th>Müşteri</th>
            <th>Grup</th>
            <th>Detay</th>
            <th>Agent</th>
          </tr>
        </thead>

        <tbody>
          {calls &&
            calls.map((call, i) => {
              return (
                <tr key={call._id}>
                  <td>{formatDate(call.createdAt)}</td>
                  <td>{`${call.customer[0].firstName} ${call.customer[0].lastName}`}</td>
                  <td>{call.customer[0].customerGroup}</td>
                  <td>{call.log}</td>
                  <td>{`${call.user[0]?.firstName} ${call.user[0]?.lastName}`}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Container>
  );
}

export default CallHistory;
