import React, {useContext, useEffect, useState} from 'react';
import PageWrapper from '../../../Components/PageWrapper';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {AppContext} from '../../../Contexts/AppContext';
import './Style/Users.css';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import UserForm from './UserForm';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import BackButton from '../../../Components/BackButton';

import {validationMessages, isFormValid} from './UserValidation';

function UserDetails() {
  const {state} = useContext(AppContext);
  const navigate = useNavigate();
  const {id: userId} = useParams();
  const [user, setUser] = useState();

  const initialFormValues = {
    firstName: {
      value: user ? user.firstName : '',
      isValid: true,
      validationMessage: validationMessages.firstName,
    },
    lastName: {
      value: user ? user.lastName : '',
      isValid: true,
      validationMessage: validationMessages.lastName,
    },
    username: {
      value: user ? user.username : '',
      isValid: true,
      validationMessage: validationMessages.username,
    },
    password: {
      value: user ? user.password : '',
      isValid: true,
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
        role: {
          ...prevFormValues.role,
          value: data.role || '',
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

  const handleClickEdit = () => {
    navigate('edit');
  };

  if (!user) return <LoadingSpinner />;

  return (
    <PageWrapper title="User Details | Management">
      <BackButton />
      <UserForm
        title={'Kullanıcı Detayları'}
        formValues={formValues}
        isFormValid={isFormValid}
        showPasswordInput={false}
        handleClickEdit={handleClickEdit}
        showSubmitButton={false}
        showEditButton={true}
        disabled={true}
        //submitButtonText={'Güncelle'}
      />
    </PageWrapper>
  );
}

export default UserDetails;
