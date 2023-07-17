import React, {useEffect, useContext, useState} from 'react';
import {Container} from 'react-bootstrap';
import {AppContext} from '../../../Contexts/AppContext';
import axios from 'axios';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import Pagination from '../../../Components/Pagination';
import FilteringTable from '../../../Components/FilteringTable';
import {useNavigate} from 'react-router-dom';

function ListUsers() {
  const {state, dispatch} = useContext(AppContext);
  const {users} = state.management;
  const navigate = useNavigate();
  const limit = 20;
  const [isFetching, setIsFetching] = useState(false);

  const COLUMNS = [
    {
      Header: 'Adı',
      accessor: 'firstName',
    },
    {
      Header: 'Soyadı',
      accessor: 'lastName',
    },
    {
      Header: 'Kullanıcı Adı',
      accessor: 'username',
    },
    {
      Header: 'Rol',
      accessor: 'role',
    },
  ];

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchUsers = async () => {
      //if (users.list.length > 0) return setIsFetching(false);

      setIsFetching(true);
      try {
        const {data} = await axios.get(
          `${process.env.REACT_APP_API}/user?page=${users.currentPage}&limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
            cancelToken: source.token,
          }
        );

        dispatch({type: 'UPDATE_USERS', data});
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchUsers();

    return () => {
      source.cancel();
    };
  }, [dispatch, state.token, users.currentPage]);

  const handleClickPage = async ({selected}) => {
    const page = selected + 1;
    setIsFetching(true);
    try {
      const {data} = await axios.get(
        `${process.env.REACT_APP_API}/user?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      dispatch({type: 'UPDATE_USERS', data});
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleClickDetails = (userId) => {
    navigate(`${userId}`);
  };

  if (isFetching) return <LoadingSpinner />;

  return (
    <Container className="p-0">
      <FilteringTable
        columns={COLUMNS}
        data={users.list}
        handleClickDetails={handleClickDetails}
      />

      <Pagination
        handleClickPage={handleClickPage}
        totalPages={users.totalPages}
        currentPage={users.currentPage - 1}
      />
    </Container>
  );
}

export default ListUsers;
