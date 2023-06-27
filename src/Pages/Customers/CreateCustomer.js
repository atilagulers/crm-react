import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import PageWrapper from '../../Components/PageWrapper';
import CustomerForm from './CustomerForm';
import {toast} from 'react-toastify';
import {AppContext} from '../../Contexts/AppContext';
import axios from 'axios';
import {
  validationMessages,
  getIsValid,
  getValidationMessage,
  isFormValid,
} from './CustomerValidation';
import BackButton from '../../Components/BackButton';

function CreateCustomer() {
  const {state} = useContext(AppContext);
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);

  const initialFormValues = {
    tc: {
      value: '',
      isValid: false,
      validationMessage: validationMessages.tc,
    },
    firstName: {
      value: '',
      isValid: false,
      validationMessage: validationMessages.firstName,
    },
    lastName: {
      value: '',
      isValid: false,
      validationMessage: validationMessages.lastName,
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
        firstName: formValues.firstName.value,
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
      navigate(`/management/customers/${data._id}`);

      toast.success(`${data.firstName} müşterisi başarıyla oluşturuldu.`);
    } catch (error) {
      if (error.response.status === 409) {
        toast.error('Bu müşteri zaten var.');
      } else {
        toast.error('Müşteri oluşturulamadı. ' + error);
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
    <PageWrapper title="Create Customer">
      <BackButton />

      <CustomerForm
        title={'Yeni Müşteri'}
        handleSubmit={handleSubmitCreate}
        handleChange={handleChangeInput}
        formValues={formValues}
        isFormValid={isFormValid}
        isCreating={isCreating}
      />
    </PageWrapper>
  );
}

export default CreateCustomer;
