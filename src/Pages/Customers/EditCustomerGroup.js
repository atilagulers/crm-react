import React, {useEffect, useContext, useState} from 'react';
import PageWrapper from '../../Components/PageWrapper';
import CustomerGroupForm from './CustomerGroupForm';
import {useNavigate, useParams} from 'react-router-dom';
import {AppContext} from '../../Contexts/AppContext';
import axios from 'axios';
import {toast} from 'react-toastify';
import LoadingSpinner from '../../Components/LoadingSpinner';
import BackButton from '../../Components/BackButton';

import {isFormValid} from './CustomerValidation';

function EditCustomer() {
  const {state} = useContext(AppContext);
  const navigate = useNavigate();
  const {id: customerGroupId} = useParams();
  const [customer, setCustomer] = useState();

  const [isUpdating, setIsUpdating] = useState(false);

  const initialFormValues = {
    name: '',
    explanation: '',
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  useEffect(() => {
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
        name: data.name || '-',
        explanation: data.explanation || '-',
      }));

      setCustomer(data);
    };
    fetchCustomerGroup();

    return () => {
      source.cancel();
    };
  }, [customerGroupId, state.token]);

  const handleChangeInput = (e) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const source = axios.CancelToken.source();
      const config = {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      };

      const body = {
        name: formValues.name,
        explanation: formValues.explanation,
      };

      await axios.patch(
        `${process.env.REACT_APP_API}/customer-group/${customerGroupId}`,
        body,
        config
      );

      navigate(`/customers/customer-groups/${customerGroupId}`);
      toast.success(`Müşteri güncellendi.`);

      return () => {
        source.cancel();
      };
    } catch (error) {
      if (error.response.status === 409) {
        toast.error('Bu müşteri zaten var.');
      } else {
        toast.error('Müşteri oluşturulamadı. ' + error);
      }
    } finally {
      setIsUpdating(false);
    }
  };
  if (!customer) return <LoadingSpinner />;

  return (
    <PageWrapper title="Customer Details | Management">
      <BackButton />
      <CustomerGroupForm
        title={'Kullanıcı Güncelle'}
        handleSubmit={handleSubmitUpdate}
        handleChange={handleChangeInput}
        formValues={formValues}
        isFormValid={isFormValid}
        isSaving={isUpdating}
        disabled={false}
        showPasswordInput={false}
        showSubmitButton={true}
        submitButtonText={'Güncelle'}
      />
    </PageWrapper>
  );
}

export default EditCustomer;
