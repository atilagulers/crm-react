import React, {useEffect, useContext, useState} from 'react';
import PageWrapper from '../../../Components/PageWrapper';
import {useNavigate, useParams} from 'react-router-dom';
import {AppContext} from '../../../Contexts/AppContext';
import axios from 'axios';
import {toast} from 'react-toastify';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import HotelForm from './HotelForm';
import BackButton from '../../../Components/BackButton';

import {
  validationMessages,
  getIsValid,
  getValidationMessage,
  isFormValid,
} from './HotelValidation';

function EditHotel() {
  const {state} = useContext(AppContext);
  const navigate = useNavigate();
  const {id: hotelId} = useParams();
  const [hotel, setHotel] = useState();

  const [isUpdating, setIsUpdating] = useState(false);

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
      password: {
        ...prevValues.password,
        isValid: true,
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
        responsible: formValues.responsible.value,
        phone: formValues.phone.value,
        email: formValues.email.value,
      };

      await axios.patch(
        `${process.env.REACT_APP_API}/hotel/${hotelId}`,
        body,
        config
      );

      navigate(`/management/hotels/${hotelId}`);
      toast.success(`Otel güncellendi.`);

      return () => {
        source.cancel();
      };
    } catch (error) {
      if (error.response.status === 409) {
        toast.error('Bu otel adı zaten kullanılıyor.');
      } else {
        toast.error('Otel oluşturulamadı. ' + error);
      }
    } finally {
      setIsUpdating(false);
    }
  };
  if (!hotel) return <LoadingSpinner />;

  return (
    <PageWrapper title="User Details | Management">
      <BackButton />
      <HotelForm
        title={'Otel Güncelle'}
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
