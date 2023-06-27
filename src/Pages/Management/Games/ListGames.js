import React, {useEffect, useContext, useState} from 'react';
import {Container} from 'react-bootstrap';
import GameTable from './GameTable';
import {AppContext} from '../../../Contexts/AppContext';
import axios from 'axios';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import Pagination from '../../../Components/Pagination';

function ListGames() {
  const {state, dispatch} = useContext(AppContext);
  const {games} = state.management;
  const [isFetching, setIsFetching] = useState(false);
  const limit = 20;

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchGames = async () => {
      //if (games.list.length > 0) return setIsFetching(false);

      setIsFetching(true);
      try {
        const {data} = await axios.get(
          `${process.env.REACT_APP_API}/game?page=${games.totalPages}&limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
            cancelToken: source.token,
          }
        );
        dispatch({type: 'UPDATE_GAMES', data});
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchGames();

    return () => {
      source.cancel();
    };
  }, []);

  const handleClickPage = async ({selected}) => {
    const page = selected + 1;
    setIsFetching(true);
    try {
      const {data} = await axios.get(
        `${process.env.REACT_APP_API}/game?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      dispatch({type: 'UPDATE_GAMES', data});
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  if (isFetching) return <LoadingSpinner />;

  return (
    <Container className="p-0">
      <GameTable games={games.list} />

      <Pagination
        handleClickPage={handleClickPage}
        totalPages={games.totalPages}
        currentPage={games.currentPage - 1}
      />
    </Container>
  );
}

export default ListGames;
