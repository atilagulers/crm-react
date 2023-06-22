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
    const source = axios.CancelToken.source();

    const fetchUsers = async () => {
      if (state.management.users.length > 0) return setIsLoading(false);

      setIsLoading(true);
      try {
        const {data} = await axios.get(`${process.env.REACT_APP_API}/user`, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
          cancelToken: source.token,
        });
        dispatch({type: 'UPDATE_USERS', data});
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();

    return () => {
      source.cancel();
    };
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container className="p-0">
      <UserTable users={state.management.users} />
    </Container>
  );
}

export default ListUsers;
