import React, {useContext, useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import HotelTable from './HotelTable';
import {AppContext} from '../../../Contexts/AppContext';
import axios from 'axios';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import Pagination from '../../../Components/Pagination';

function ListHotels() {
  const {state, dispatch} = useContext(AppContext);
  const {hotels} = state.management;
  const [isFetching, setIsFetching] = useState(false);
  const limit = 20;

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchHotels = async () => {
      //if (hotels.list.length > 0) return setIsFetching(false);

      setIsFetching(true);
      try {
        const {data} = await axios.get(
          `${process.env.REACT_APP_API}/hotel?page=${hotels.currentPage}&limit=${limit}`,
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
        setIsFetching(false);
      }
    };
    fetchHotels();

    return () => {
      source.cancel();
    };
  }, [dispatch, hotels.currentPage, state.token]);

  const handleClickPage = async ({selected}) => {
    const page = selected + 1;
    setIsFetching(true);
    try {
      const {data} = await axios.get(
        `${process.env.REACT_APP_API}/hotel?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      dispatch({type: 'UPDATE_HOTELS', data});
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  if (isFetching) return <LoadingSpinner />;

  return (
    <Container className="p-0">
      <HotelTable hotels={hotels.list} />

      <Pagination
        handleClickPage={handleClickPage}
        totalPages={hotels.totalPages}
        currentPage={hotels.currentPage - 1}
      />
    </Container>
  );
}

export default ListHotels;
