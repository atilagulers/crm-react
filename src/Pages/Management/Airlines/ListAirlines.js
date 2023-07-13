import {useEffect, useState, useContext} from 'react';
import {Container} from 'react-bootstrap';
import AirlineTable from './AirlineTable';
import {AppContext} from '../../../Contexts/AppContext';
import axios from 'axios';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import Pagination from '../../../Components/Pagination';

function ListAirlines() {
  const {state, dispatch} = useContext(AppContext);
  const {airlines} = state.management;
  const [isFetching, setIsFetching] = useState(false);
  const limit = 20;

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchAirlines = async () => {
      //if (airlines.list.length > 0) return setIsFetching(false);

      setIsFetching(true);
      try {
        const {data} = await axios.get(
          `${process.env.REACT_APP_API}/airline?page=${airlines.currentPage}&limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
            cancelToken: source.token,
          }
        );
        dispatch({type: 'UPDATE_AIRLINES', data});
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchAirlines();

    return () => {
      source.cancel();
    };
  }, [airlines.currentPage, state.token, dispatch]);

  const handleClickPage = async ({selected}) => {
    const page = selected + 1;
    setIsFetching(true);
    try {
      const {data} = await axios.get(
        `${process.env.REACT_APP_API}/airline?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      dispatch({type: 'UPDATE_AIRLINES', data});
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  if (isFetching) return <LoadingSpinner />;

  return (
    <Container className="p-0">
      <AirlineTable airlines={airlines.list} />

      <Pagination
        handleClickPage={handleClickPage}
        totalPages={airlines.totalPages}
        currentPage={airlines.currentPage - 1}
      />
    </Container>
  );
}

export default ListAirlines;
