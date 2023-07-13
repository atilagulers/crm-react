import React, {useEffect, useState, useContext} from 'react';
import {Container, Table} from 'react-bootstrap';
import {AppContext} from '../../Contexts/AppContext';
import axios from 'axios';
import LoadingSpinner from '../../Components/LoadingSpinner';
import {formatDate} from '../../Helpers';
import Pagination from '../../Components/Pagination';

function CallHistory() {
  const {state, dispatch} = useContext(AppContext);

  const calls = state.calls.past;
  const [isFetching, setIsFetching] = useState(true);
  const limit = 20;

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchCalls = async () => {
      setIsFetching(true);
      try {
        const {data} = await axios.get(
          `${process.env.REACT_APP_API}/call?page=${calls.currentPage}&limit=${limit}&sortBy=createdAt&sortOrder=-1`,
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
            cancelToken: source.token,
          }
        );
        dispatch({type: 'UPDATE_PAST_CALLS', data});
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
  }, [state.token, calls.currentPage, dispatch]);

  const handleClickPage = async ({selected}) => {
    const page = selected + 1;
    setIsFetching(true);
    try {
      const {data} = await axios.get(
        `${process.env.REACT_APP_API}/call?page=${page}&limit=${limit}&sortBy=firstName&sortOrder=1&willBeCalled=true&callDate=today`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      dispatch({type: 'UPDATE_PAST_CALLS', data});
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

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
            <th>Telefon 1</th>
            <th>Telefon 2</th>
            <th>Telefon 3</th>
            <th>Detay</th>
            <th>Agent</th>
          </tr>
        </thead>

        <tbody>
          {calls.list &&
            calls.list.map((call, i) => {
              return (
                <tr key={call._id}>
                  <td>{formatDate(call.createdAt)}</td>
                  <td>{`${call.customer[0].firstName} ${call.customer[0].lastName}`}</td>
                  <td>{call.customer[0].phone1}</td>
                  <td>{call.customer[0].phone2}</td>
                  <td>{call.customer[0].phone3}</td>

                  <td>{call.log}</td>
                  <td>{`${call.user[0]?.firstName} ${call.user[0]?.lastName}`}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <Pagination
        handleClickPage={handleClickPage}
        totalPages={calls.totalPages}
        currentPage={calls.currentPage - 1}
      />
    </Container>
  );
}

export default CallHistory;
