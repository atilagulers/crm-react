import React, {useState, useContext, useEffect} from 'react';
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
      isValid: true,
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
    phone1: {
      value: '',
      isValid: false,
      validationMessage: validationMessages.phone1,
    },
    phone2: {
      value: '',
      isValid: true,
      validationMessage: validationMessages.phone1,
    },
    phone3: {
      value: '',
      isValid: true,
      validationMessage: validationMessages.phone1,
    },
    email: {
      value: '',
      isValid: true,
      validationMessage: validationMessages.email,
    },
    birthday: {
      value: '',
      isValid: true,
      validationMessage: validationMessages.birthday,
    },
    address: {
      value: '',
      isValid: true,
      validationMessage: validationMessages.address,
    },
    workAddress: {
      value: '',
      isValid: true,
      validationMessage: validationMessages.workAddress,
    },
    city: {
      value: 'Diğer',
      isValid: true,
      validationMessage: validationMessages.city,
    },
    gender: {
      value: 'erkek',
      isValid: true,
      validationMessage: validationMessages.gender,
    },
    user: {
      value: '',
      isValid: true,
      validationMessage: validationMessages.user,
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

  const createCustomer = async () => {
    try {
      setIsCreating(true);

      const body = {
        tc: formValues.tc.value,
        firstName: formValues.firstName.value,
        lastName: formValues.lastName.value,
        phone1: formValues.phone1.value,
        phone2: formValues.phone2.value,
        phone3: formValues.phone3.value,
        email: formValues.email.value,
        birthday: formValues.birthday.value,
        address: formValues.address.value,
        workAddress: formValues.workAddress.value,
        city: formValues.city.value,
        gender: formValues.gender.value,
        user: formValues.user.value,
      };
      console.log(body);
      const config = {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      };

      const {data} = await axios.post(
        `${process.env.REACT_APP_API}/customer`,
        body,
        config
      );
      navigate(`/customers/${data._id}`);

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
    console.log(formValues);
    if (!isFormValid(formValues)) return;

    await createCustomer();

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
