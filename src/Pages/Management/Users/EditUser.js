import React, {useEffect, useContext, useState} from 'react';
import PageWrapper from '../../../Components/PageWrapper';
import UserForm from './UserForm';
import {useNavigate, useParams} from 'react-router-dom';
import {AppContext} from '../../../Contexts/AppContext';
import axios from 'axios';
import {toast} from 'react-toastify';
import LoadingSpinner from '../../../Components/LoadingSpinner';

import {
  validationMessages,
  getIsValid,
  getValidationMessage,
  isFormValid,
} from './UserValidation';

function EditUser() {
  const {state} = useContext(AppContext);
  const navigate = useNavigate();
  const {id: userId} = useParams();
  const [user, setUser] = useState();

  const [isUpdating, setIsUpdating] = useState(false);

  const initialFormValues = {
    firstName: {
      value: user ? user.firstName : '',
      isValid: false,
      validationMessage: validationMessages.firstName,
    },
    lastName: {
      value: user ? user.lastName : '',
      isValid: false,
      validationMessage: validationMessages.lastName,
    },
    username: {
      value: user ? user.username : '',
      isValid: false,
      validationMessage: validationMessages.username,
    },
    password: {
      value: user ? user.password : '',
      isValid: false,
      validationMessage: validationMessages.password,
    },
    role: {
      value: 'agent',
      isValid: true,
      validationMessage: '',
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
        `${process.env.REACT_APP_API}/user/${userId}`,
        config
      );

      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        firstName: {
          ...prevFormValues.firstName,
          value: data.firstName || '',
          isValid: true,
        },
        lastName: {
          ...prevFormValues.lastName,
          value: data.lastName || '',
          isValid: true,
        },
        username: {
          ...prevFormValues.username,
          value: data.username || '',
          isValid: true,
        },
      }));

      setUser(data);
    };
    fetchUser();

    return () => {
      source.cancel();
    };
  }, []);

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
        firstName: formValues.firstName.value,
        lastName: formValues.lastName.value,
        username: formValues.username.value,
        role: formValues.role.value,
      };

      await axios.patch(
        `${process.env.REACT_APP_API}/user/${userId}`,
        body,
        config
      );

      navigate(`/management/users/${userId}`);
      toast.success(`Kullanıcı güncellendi.`);

      return () => {
        source.cancel();
      };
    } catch (error) {
      toast.error(`Kullanıcı güncellenemedi. ${error}`);
    } finally {
      setIsUpdating(false);
    }
  };
  if (!user) return <LoadingSpinner />;
  return (
    <PageWrapper title="User Details | Management">
      <UserForm
        title={'Kullanıcı Detayları'}
        handleSubmit={handleSubmitUpdate}
        handleChange={handleChangeInput}
        formValues={formValues}
        isFormValid={isFormValid}
        isSaving={isUpdating}
        disabled={false}
        showPasswordInput={false}
        //handleClickEdit={handleClickEdit}
        showSubmitButton={true}
        submitButtonText={'Güncelle'}
      />
    </PageWrapper>
  );
}

export default EditUser;
