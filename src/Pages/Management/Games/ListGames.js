import React, {useEffect, useContext, useState} from 'react';
import {Container} from 'react-bootstrap';
import GameTable from './GameTable';
import {AppContext} from '../../../Contexts/AppContext';
import axios from 'axios';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import Pagination from '../../../Components/Pagination';
import {useNavigate} from 'react-router-dom';
import FilteringTable from '../../../Components/FilteringTable';

function ListGames() {
  const {state, dispatch} = useContext(AppContext);
  const {games} = state.management;
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const limit = 50;

  const COLUMNS = [
    {
      Header: 'Oyun Adı',
      accessor: 'name',
    },
  ];

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
  }, [state.token, dispatch, games.totalPages]);

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

  const handleClickDetails = (gameId) => {
    navigate(`${gameId}`);
  };

  if (isFetching) return <LoadingSpinner />;

  return (
    <Container className="p-0">
      <FilteringTable
        columns={COLUMNS}
        data={games.list}
        handleClickDetails={handleClickDetails}
      />

      <Pagination
        handleClickPage={handleClickPage}
        totalPages={games.totalPages}
        currentPage={games.currentPage - 1}
      />
    </Container>
  );
}

export default ListGames;
