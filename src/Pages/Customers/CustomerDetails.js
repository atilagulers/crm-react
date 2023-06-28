import React, {useEffect, useState, useContext} from 'react';
import PageWrapper from '../../Components/PageWrapper';
import {Row, Table, Container} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import LoadingSpinner from '../../Components/LoadingSpinner';
import axios from 'axios';
import {AppContext} from '../../Contexts/AppContext';
import CustomerForm from './CustomerForm';
import BackButton from '../../Components/BackButton';
import {
  validationMessages,
  getIsValid,
  getValidationMessage,
  isFormValid,
} from './CustomerValidation';

function CustomerDetails() {
  const {state} = useContext(AppContext);

  const {id: customerId} = useParams();
  const [customer, setCustomer] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const initialFormValues = {
    tc: {
      value: customer ? customer.tc : '',
      isValid: true,
      validationMessage: validationMessages.tc,
    },
    firstName: {
      value: customer ? customer.firstName : '',
      isValid: false,
      validationMessage: validationMessages.firstName,
    },
    lastName: {
      value: customer ? customer.lastName : '',
      isValid: false,
      validationMessage: validationMessages.lastName,
    },
    phone1: {
      value: customer ? customer.phone1 : '',
      isValid: false,
      validationMessage: validationMessages.phone1,
    },
    phone2: {
      value: customer ? customer.phone2 : '',
      isValid: true,
      validationMessage: validationMessages.phone1,
    },
    phone3: {
      value: customer ? customer.phone3 : '',
      isValid: true,
      validationMessage: validationMessages.phone1,
    },
    email: {
      value: customer ? customer.email : '',
      isValid: true,
      validationMessage: validationMessages.email,
    },
    birthday: {
      value: customer ? customer.birthday : '',
      isValid: true,
      validationMessage: validationMessages.birthday,
    },
    address: {
      value: customer ? customer.address : '',
      isValid: true,
      validationMessage: validationMessages.address,
    },
    workAddress: {
      value: customer ? customer.workAddress : '',
      isValid: true,
      validationMessage: validationMessages.workAddress,
    },
    city: {
      value: customer ? customer.city : '',
      isValid: true,
      validationMessage: validationMessages.city,
    },
    gender: {
      value: customer ? customer.gender : '',
      isValid: true,
      validationMessage: validationMessages.gender,
    },
    user: {
      value: customer
        ? `${customer.user.firstName} ${customer.user.lastName}`
        : '',
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

  useEffect(() => {
    setIsFetching(true);

    const source = axios.CancelToken.source();

    const fetchHotel = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      };

      const {data} = await axios.get(
        `${process.env.REACT_APP_API}/customer/${customerId}`,
        config
      );

      setCustomer(data);
    };
    fetchHotel();

    setIsFetching(false);

    return () => {
      source.cancel();
    };
  }, []);

  if (isFetching) return <LoadingSpinner />;

  return (
    <PageWrapper title={'Details | Customer'}>
      <BackButton />
      {console.log(formValues)}
      <CustomerForm
        title={'Müşteri Detayları'}
        //handleSubmit={handleSubmitCreate}
        handleChange={handleChangeInput}
        formValues={formValues}
        isFormValid={isFormValid}
        disabled={true}
        //isCreating={isCreating}
        //users={users}
      />
    </PageWrapper>
  );
}

export default CustomerDetails;
