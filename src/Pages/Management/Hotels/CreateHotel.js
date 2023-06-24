import React, {useEffect, useState, useContext} from 'react';
import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import HotelForm from './HotelForm';
import PageWrapper from '../../../Components/PageWrapper';
import {AppContext} from '../../../Contexts/AppContext';
import {toast} from 'react-toastify';
import axios from 'axios';

function CreateHotel() {
  const {state} = useContext(AppContext);

  const [isCreating, setIsCreating] = useState(false);
  const validationMessages = {
    name: 'Otel adı 3 ile 30 karakter arasında olmalıdır.',
    responsible: 'Yetkili kişi 3 ile 30 karakter arasında olmalıdır.',
    phone: 'Telefon numarası 10 karakter olmalıdır.',
    email: 'Lütfen geçerli bir email giriniz.',
  };

  const initialFormValues = {
    name: {
      value: '',
      isValid: false,
      validationMessage: validationMessages.name,
    },
    responsible: {
      value: '',
      isValid: false,
      validationMessage: validationMessages.responsible,
    },
    phone: {
      value: '',
      isValid: false,
      validationMessage: validationMessages.phone,
    },
    email: {
      value: '',
      isValid: false,
      validationMessage: validationMessages.email,
    },
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  const handleChangeInput = (e) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: {
        value: e.target.value,
        isValid: getIsValid(e.target.name, e.target.value),
        validationMessage: getValidationMessage(e.target.name, e.target.value),
      },
    }));
  };

  const getIsValid = (field, value) => {
    if (field === 'name') return value.length >= 3 && value.length <= 30;
    if (field === 'responsible') return value.length >= 3 && value.length <= 30;

    if (field === 'phone') return value.length === 10;

    if (field === 'email') {
      const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegex.test(value);
    }
  };

  const getValidationMessage = (field, value = '') => {
    if (field === 'name' && !formValues[field].isValid) {
      return validationMessages.name;
    }
    if (field === 'responsible' && !formValues[field].isValid) {
      return validationMessages.responsible;
    }
    if (field === 'phone' && !formValues[field].isValid) {
      return validationMessages.phone;
    }
    if (field === 'email' && !formValues[field].isValid) {
      return validationMessages.email;
    }

    return '';
  };

  const createHotel = async () => {
    try {
      setIsCreating(true);

      const body = {
        name: formValues.name.value,
        responsible: formValues.responsible.value,
        phone: formValues.phone.value,
        email: formValues.email.value,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      };

      const {data} = await axios.post(
        `${process.env.REACT_APP_API}/hotel`,
        body,
        config
      );

      toast.success(`${data.name} oteli başarıyla oluşturuldu.`);
    } catch (error) {
      if (error.response.status === 409) {
        toast.error('Bu email zaten kullanılıyor.');
      } else {
        toast.error('Otel oluşturulamadı. ' + error);
      }
    } finally {
      setIsCreating(false);
    }
  };

  const isFormValid = () => {
    return Object.values(formValues).every((field) => field.isValid);
  };

  const handleSubmitCreate = async (e) => {
    e.preventDefault();

    if (!isFormValid()) return;

    await createHotel();

    setFormValues(initialFormValues);
  };

  return (
    <PageWrapper title="Create Hotel | Management">
      <HotelForm
        title={'Yeni Otel'}
        handleSubmitCreate={handleSubmitCreate}
        handleChange={handleChangeInput}
        formValues={formValues}
        isFormValid={isFormValid}
        isCreating={isCreating}
      />
    </PageWrapper>
  );
}

export default CreateHotel;
