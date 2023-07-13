import React, {useEffect, useContext, useState} from 'react';
import PageWrapper from '../../Components/PageWrapper';
import CustomerForm from './CustomerForm';
import {useNavigate, useParams} from 'react-router-dom';
import {AppContext} from '../../Contexts/AppContext';
import axios from 'axios';
import {toast} from 'react-toastify';
import LoadingSpinner from '../../Components/LoadingSpinner';
import BackButton from '../../Components/BackButton';

import {
  validationMessages,
  getIsValid,
  getValidationMessage,
  isFormValid,
} from './CustomerValidation';

function EditCustomer() {
  const {state} = useContext(AppContext);
  const navigate = useNavigate();
  const {id: customerId} = useParams();
  const [customer, setCustomer] = useState();

  const [isUpdating, setIsUpdating] = useState(false);

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
    customerGroup: {
      value: customer ? customer.customerGroup : '',
      isValid: true,
      validationMessage: validationMessages.customerGroup,
    },
  };
  const [formValues, setFormValues] = useState(initialFormValues);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchUser = async () => {
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
          value: data.tc || '-',
          isValid: true,
        },
        firstName: {
          ...prevFormValues.firstName,
          value: data.firstName || '-',
          isValid: true,
        },
        lastName: {
          ...prevFormValues.lastName,
          value: data.lastName || '-',
          isValid: true,
        },
        phone1: {
          ...prevFormValues.phone1,
          value: data.phone1 || '-',
          isValid: true,
        },
        phone2: {
          ...prevFormValues.phone2,
          value: data.phone2 || '-',
          isValid: true,
        },
        phone3: {
          ...prevFormValues.phone3,
          value: data.phone3 || '-',
          isValid: true,
        },
        email: {
          ...prevFormValues.email,
          value: data.email || '-',
          isValid: true,
        },
        birthday: {
          ...prevFormValues.birthday,
          value: new Date(data.birthday) || '1970-01-01',
          isValid: true,
        },
        address: {
          ...prevFormValues.address,
          value: data.address || '-',
          isValid: true,
        },
        workAddress: {
          ...prevFormValues.workAddress,
          value: data.workAddress || '-',
          isValid: true,
        },
        city: {
          ...prevFormValues.city,
          value: data.city || '-',
          isValid: true,
        },
        gender: {
          ...prevFormValues.gender,
          value: data.gender || '-',
          isValid: true,
        },
        user: {
          ...prevFormValues.user,
          value: data.user || '-',
          isValid: true,
        },
        customerGroup: {
          ...prevFormValues.customerGroup,
          value: data.customerGroup || '-',
          isValid: true,
        },
      }));

      setCustomer(data);
    };
    fetchUser();

    return () => {
      source.cancel();
    };
  }, [customerId, state.token]);

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
        tc: formValues.tc.value,
        firstName: formValues.firstName.value,
        lastName: formValues.lastName.value,
        phone1: formValues.phone1.value,
        phone2: formValues.phone2.value,
        phone3: formValues.phone3.value,
        email: formValues.email.value,
        birthday: new Date(formValues.birthday.value),
        address: formValues.address.value,
        workAddress: formValues.workAddress.value,
        city: formValues.city.value,
        gender: formValues.gender.value,
        user: formValues.user.value._id,
        customerGroup: formValues.customerGroup.value,
      };
      //console.log(body);
      await axios.patch(
        `${process.env.REACT_APP_API}/customer/${customerId}`,
        body,
        config
      );

      navigate(`/customers/${customerId}`);
      toast.success(`Müşteri güncellendi.`);

      return () => {
        source.cancel();
      };
    } catch (error) {
      if (error.response.status === 409) {
        toast.error('Bu müşteri zaten var.');
      } else {
        toast.error('Müşteri oluşturulamadı. ' + error);
      }
    } finally {
      setIsUpdating(false);
    }
  };
  if (!customer) return <LoadingSpinner />;

  return (
    <PageWrapper title="Customer Details | Management">
      <BackButton />
      <CustomerForm
        title={'Kullanıcı Güncelle'}
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

export default EditCustomer;
