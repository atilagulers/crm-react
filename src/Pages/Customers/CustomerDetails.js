import React, {useEffect, useState, useContext} from 'react';
import PageWrapper from '../../Components/PageWrapper';
import {Row, Table, Container} from 'react-bootstrap';
import {useNavigate, useParams} from 'react-router-dom';
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
  const navigate = useNavigate();
  const {id: customerId} = useParams();
  const [customer, setCustomer] = useState();
  const [isFetching, setIsFetching] = useState(true);

  const initialFormValues = {
    tc: {
      value: customer ? customer.tc : '',
      isValid: true,
      validationMessage: validationMessages.tc,
    },
    firstName: {
      value: customer ? customer.firstName : '',
      isValid: true,
      validationMessage: validationMessages.firstName,
    },
    lastName: {
      value: customer ? customer.lastName : '',
      isValid: true,
      validationMessage: validationMessages.lastName,
    },
    phone1: {
      value: customer ? customer.phone1 : '',
      isValid: true,
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
      value: customer ? new Date(customer.birthday) : '',
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
    customerGroup: {
      value: customer ? customer.customerGroup : '',
      isValid: true,
      validationMessage: validationMessages.customerGroup,
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

      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        tc: {
          ...prevFormValues.tc,
          value: data.tc || ' ',
          isValid: true,
        },
        firstName: {
          ...prevFormValues.firstName,
          value: data.firstName || ' ',
          isValid: true,
        },
        lastName: {
          ...prevFormValues.lastName,
          value: data.lastName || ' ',
          isValid: true,
        },
        phone1: {
          ...prevFormValues.phone1,
          value: data.phone1 || ' ',
          isValid: true,
        },
        phone2: {
          ...prevFormValues.phone2,
          value: data.phone2 || ' ',
          isValid: true,
        },
        phone3: {
          ...prevFormValues.phone3,
          value: data.phone3 || ' ',
          isValid: true,
        },
        email: {
          ...prevFormValues.email,
          value: data.email || ' ',
          isValid: true,
        },
        birthday: {
          ...prevFormValues.birthday,
          value:
            new Date(data.birthday).toISOString().split('T')[0] || '1970 01 01',
          isValid: true,
        },
        address: {
          ...prevFormValues.address,
          value: data.address || ' ',
          isValid: true,
        },
        workAddress: {
          ...prevFormValues.workAddress,
          value: data.workAddress || ' ',
          isValid: true,
        },
        city: {
          ...prevFormValues.city,
          value: data.city || ' ',
          isValid: true,
        },
        gender: {
          ...prevFormValues.gender,
          value: data.gender || ' ',
          isValid: true,
        },
        user: {
          ...prevFormValues.user,
          value: data.user || ' ',
          isValid: true,
        },
        customerGroup: {
          ...prevFormValues.customerGroup,
          value: data.customerGroup || ' ',
          isValid: true,
        },
      }));

      setCustomer(data);
    };
    fetchHotel();

    setIsFetching(false);

    return () => {
      source.cancel();
    };
  }, []);

  const handleClickEdit = () => {
    navigate('edit');
  };

  if (isFetching || !customer) return <LoadingSpinner />;

  return (
    <PageWrapper title={'Details | Customer'}>
      <BackButton />

      <CustomerForm
        title={'Müşteri Detayları'}
        formValues={formValues}
        isFormValid={isFormValid}
        showPasswordInput={false}
        handleClickEdit={handleClickEdit}
        showSubmitButton={false}
        showEditButton={true}
        disabled={true}
      />
    </PageWrapper>
  );
}

export default CustomerDetails;
