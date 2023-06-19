import {useEffect, useContext, useState} from 'react';
import {Container} from 'react-bootstrap';
import UserTable from './UserTable';
import {AppContext} from '../../../Contexts/AppContext';
import axios from 'axios';
import LoadingSpinner from '../../../Components/LoadingSpinner';

function ListUsers() {
  const {state, dispatch} = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const {data} = await axios.get(`${process.env.REACT_APP_API}/user`, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });
        dispatch({type: 'UPDATE_USERS', data});
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Container className="p-0">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <UserTable users={state.management.users} />
      )}
    </Container>
  );
}

export default ListUsers;
