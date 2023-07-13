import React, {useContext, useEffect, useState} from 'react';
import PageWrapper from '../../../Components/PageWrapper';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {AppContext} from '../../../Contexts/AppContext';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import AirlineForm from './AirlineForm';
import {isFormValid, validationMessages} from './AirlineValidation';
import BackButton from '../../../Components/BackButton';

function AirlineDetails() {
  const {state} = useContext(AppContext);
  const navigate = useNavigate();
  const {id: airlineId} = useParams();
  const [airline, setAirline] = useState();

  const initialFormValues = {
    name: {
      value: airline ? airline.name : '',
      isValid: false,
      validationMessage: validationMessages.name,
    },
    responsible: {
      value: airline ? airline.responsible : '',
      isValid: false,
      validationMessage: validationMessages.responsible,
    },
    phone: {
      value: airline ? airline.phone : '',
      isValid: false,
      validationMessage: validationMessages.phone,
    },
    email: {
      value: airline ? airline.email : '',
      isValid: false,
      validationMessage: validationMessages.email,
    },
  };
  const [formValues, setFormValues] = useState(initialFormValues);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchHotel = async () => {
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
    fetchHotel();

    return () => {
      source.cancel();
    };
  }, [airlineId, state.token]);

  const handleClickEdit = () => {
    navigate('edit');
  };

  if (!airline) return <LoadingSpinner />;
  return (
    <PageWrapper title="User Details | Management">
      <BackButton />
      <AirlineForm
        title={'Otel Detayları'}
        //handleSubmit={handleSubmitUpdate}
        //handleChange={handleChangeInput}
        formValues={formValues}
        isFormValid={isFormValid}
        //isSaving={isUpdating}
        handleClickEdit={handleClickEdit}
        showSubmitButton={false}
        showEditButton={true}
        submitButtonText={'Güncelle'}
        disabled={true}
      />
    </PageWrapper>
  );
}

export default AirlineDetails;
