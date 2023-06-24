import React, {useContext, useEffect, useState} from 'react';
import {Container, Table, Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import HotelTable from './HotelTable';
import {AppContext} from '../../../Contexts/AppContext';
import axios from 'axios';
import LoadingSpinner from '../../../Components/LoadingSpinner';

function ListHotels() {
  const {state, dispatch} = useContext(AppContext);
  const {hotels} = state.management;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchHotels = async () => {
      if (hotels.list.length > 0) return setIsLoading(false);

      setIsLoading(true);
      try {
        const {data} = await axios.get(
          `${process.env.REACT_APP_API}/hotel?page=1&limit=30`,
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
            cancelToken: source.token,
          }
        );
        dispatch({type: 'UPDATE_HOTELS', data});
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHotels();

    return () => {
      source.cancel();
    };
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container className="p-0">
      <HotelTable hotels={hotels.list} />
    </Container>
  );
}

export default ListHotels;
