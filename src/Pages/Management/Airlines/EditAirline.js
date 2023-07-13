import React, {useEffect, useContext, useState} from 'react';
import PageWrapper from '../../../Components/PageWrapper';
import {useNavigate, useParams} from 'react-router-dom';
import {AppContext} from '../../../Contexts/AppContext';
import axios from 'axios';
import {toast} from 'react-toastify';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import AirlineForm from './AirlineForm';
import BackButton from '../../../Components/BackButton';

import {
  validationMessages,
  getIsValid,
  getValidationMessage,
  isFormValid,
} from './AirlineValidation';

function EditHotel() {
  const {state} = useContext(AppContext);
  const navigate = useNavigate();
  const {id: airlineId} = useParams();
  const [airline, setAirline] = useState();

  const [isUpdating, setIsUpdating] = useState(false);

  const initialFormValues = {
    name: {
      value: airline ? airline.name : '',
      isValid: false,
      validationMessage: validationMessages.name,
    },
  };
  const [formValues, setFormValues] = useState(initialFormValues);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchAirline = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      };

      const {data} = await axios.get(
        `${process.env.REACT_APP_API}/airline/${airlineId}`,
        config
      );

      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        name: {
          ...prevFormValues.name,
          value: data.name || '',
          isValid: true,
        },
      }));

      setAirline(data);
    };
    fetchAirline();

    return () => {
      source.cancel();
    };
  }, [airlineId, state.token]);

  const handleChangeInput = (e) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: {
        value: e.target.value,
        isValid: getIsValid(e.target.name, e.target.value),
        validationMessage: getValidationMessage(
          e.target.name,
          e.target.value,
          formValues
        ),
      },
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
        name: formValues.name.value,
      };

      await axios.patch(
        `${process.env.REACT_APP_API}/airline/${airlineId}`,
        body,
        config
      );

      navigate(`/management/airlines/${airlineId}`);
      toast.success(`Havayolu güncellendi.`);

      return () => {
        source.cancel();
      };
    } catch (error) {
      if (error.response.status === 409) {
        toast.error('Bu havayolu adı zaten kullanılıyor.');
      } else {
        toast.error('Havayolu oluşturulamadı. ' + error);
      }
    } finally {
      setIsUpdating(false);
    }
  };
  if (!airline) return <LoadingSpinner />;

  return (
    <PageWrapper title="User Details | Management">
      <BackButton />
      <AirlineForm
        title={'Havayolu Güncelle'}
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

export default EditHotel;
