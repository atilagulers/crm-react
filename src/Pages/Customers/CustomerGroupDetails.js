import React, {useEffect, useState, useContext} from 'react';
import PageWrapper from '../../Components/PageWrapper';
import {useNavigate, useParams} from 'react-router-dom';
import LoadingSpinner from '../../Components/LoadingSpinner';
import axios from 'axios';
import {AppContext} from '../../Contexts/AppContext';
import CustomerGroupForm from './CustomerGroupForm';
import BackButton from '../../Components/BackButton';

function CustomerGroupDetails() {
  const {state} = useContext(AppContext);
  const navigate = useNavigate();
  const {id: customerGroupId} = useParams();
  const [customer, setCustomer] = useState();
  const [isFetching, setIsFetching] = useState(true);

  const initialFormValues = {
    name: '',
    explanation: '',
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  useEffect(() => {
    setIsFetching(true);

    const source = axios.CancelToken.source();

    const fetchCustomerGroup = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      };

      const {data} = await axios.get(
        `${process.env.REACT_APP_API}/customer-group/${customerGroupId}`,
        config
      );

      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        name: data.name,
        explanation: data.explanation,
      }));

      setCustomer(data);
    };
    fetchCustomerGroup();

    setIsFetching(false);

    return () => {
      source.cancel();
    };
  }, [customerGroupId, state.token]);

  const handleClickEdit = () => {
    navigate('edit');
  };

  if (isFetching || !customer) return <LoadingSpinner />;

  return (
    <PageWrapper title={'Details | Customer Group'}>
      <BackButton />

      <CustomerGroupForm
        title={'Müşteri Detayları'}
        formValues={formValues}
        showPasswordInput={false}
        handleClickEdit={handleClickEdit}
        showSubmitButton={false}
        showEditButton={true}
        disabled={true}
      />
    </PageWrapper>
  );
}

export default CustomerGroupDetails;
