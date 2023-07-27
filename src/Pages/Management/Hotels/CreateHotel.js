import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import HotelForm from './HotelForm';
import PageWrapper from '../../../Components/PageWrapper';
import {AppContext} from '../../../Contexts/AppContext';
import {toast} from 'react-toastify';
import axios from 'axios';
import {
  validationMessages,
  getIsValid,
  getValidationMessage,
  isFormValid,
} from './HotelValidation';
import BackButton from '../../../Components/BackButton';

function CreateHotel() {
  const {state} = useContext(AppContext);
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);

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
        validationMessage: getValidationMessage(
          e.target.name,
          e.target.value,
          formValues
        ),
      },
    }));
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
      navigate(`/management/hotels/${data._id}`);

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

  const handleSubmitCreate = async (e) => {
    e.preventDefault();

    if (!isFormValid(formValues)) return;

    await createHotel();

    setFormValues(initialFormValues);
  };

  return (
    <PageWrapper title="Create Hotel | Management">
      <BackButton />
      <HotelForm
        title={'Yeni Otel'}
        handleSubmit={handleSubmitCreate}
        handleChange={handleChangeInput}
        formValues={formValues}
        isFormValid={isFormValid}
        isSaving={isCreating}
      />
    </PageWrapper>
  );
}

export default CreateHotel;
