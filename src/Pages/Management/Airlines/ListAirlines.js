import {useEffect, useState, useContext} from 'react';
import {Container} from 'react-bootstrap';
import AirlineTable from './AirlineTable';
import {AppContext} from '../../../Contexts/AppContext';
import axios from 'axios';
import LoadingSpinner from '../../../Components/LoadingSpinner';

function ListAirlines() {
  const {state, dispatch} = useContext(AppContext);
  const {airlines} = state.management;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchAirlines = async () => {
      if (airlines.list.length > 0) return setIsLoading(false);

      setIsLoading(true);
      try {
        const {data} = await axios.get(
          `${process.env.REACT_APP_API}/airline?page=1&limit=30`,
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
        setIsLoading(false);
      }
    };
    fetchAirlines();

    return () => {
      source.cancel();
    };
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container className="p-0">
      <AirlineTable airlines={airlines.list} />
    </Container>
  );
}

export default ListAirlines;
