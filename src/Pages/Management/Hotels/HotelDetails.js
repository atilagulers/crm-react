import React, {useContext, useEffect, useState} from 'react';
import PageWrapper from '../../../Components/PageWrapper';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {AppContext} from '../../../Contexts/AppContext';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import HotelForm from './HotelForm';
import {validationMessages, isFormValid} from './HotelValidation';
import BackButton from '../../../Components/BackButton';

function HotelDetails() {
  const {state} = useContext(AppContext);
  const navigate = useNavigate();
  const {id: hotelId} = useParams();
  const [hotel, setHotel] = useState();

  const initialFormValues = {
    name: {
      value: hotel ? hotel.name : '',
      isValid: false,
      validationMessage: validationMessages.name,
    },
    responsible: {
      value: hotel ? hotel.responsible : '',
      isValid: false,
      validationMessage: validationMessages.responsible,
    },
    phone: {
      value: hotel ? hotel.phone : '',
      isValid: false,
      validationMessage: validationMessages.phone,
    },
    email: {
      value: hotel ? hotel.email : '',
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
        `${process.env.REACT_APP_API}/hotel/${hotelId}`,
        config
      );

      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        name: {
          ...prevFormValues.name,
          value: data.name || '',
          isValid: true,
        },
        responsible: {
          ...prevFormValues.responsible,
          value: data.responsible || '',
          isValid: true,
        },
        phone: {
          ...prevFormValues.phone,
          value: data.phone || '',
          isValid: true,
        },
        email: {
          ...prevFormValues.email,
          value: data.email || '',
          isValid: true,
        },
      }));

      setHotel(data);
    };
    fetchHotel();

    return () => {
      source.cancel();
    };
  }, [hotelId, state.token]);

  const handleClickEdit = () => {
    navigate('edit');
  };

  if (!hotel) return <LoadingSpinner />;

  return (
    <PageWrapper title="User Details | Management">
      <BackButton />
      <HotelForm
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

export default HotelDetails;
