import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {AppContext} from '../../Contexts/AppContext';
import LoadingSpinner from '../../Components/LoadingSpinner';
import {useNavigate} from 'react-router-dom';
import FilteringTable from '../../Components/FilteringTable';

function ListCustomerGroups() {
  const {state, dispatch} = useContext(AppContext);
  const customerGroups = state.customerGroups;
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(true);

  const COLUMNS = [
    {
      Header: 'Grup Adı',
      accessor: 'name',
    },
    {
      Header: 'Açıklama',
      accessor: 'explanation',
    },
  ];

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchCustomers = async () => {
      setIsFetching(true);
      try {
        const {data} = await axios.get(
          `${process.env.REACT_APP_API}/customer-group?page=1&limit=30`,
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
            cancelToken: source.token,
          }
        );

        dispatch({type: 'UPDATE_CUSTOMER_GROUPS', data});
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchCustomers();

    return () => {
      source.cancel();
    };
  }, [dispatch, state.token]);

  const handleClickDetails = (groupId) => {
    navigate(`${groupId}`);
  };

  if (isFetching) return <LoadingSpinner />;

  return (
    <FilteringTable
      columns={COLUMNS}
      data={customerGroups.list}
      handleClickDetails={handleClickDetails}
    />
  );
}

export default ListCustomerGroups;
