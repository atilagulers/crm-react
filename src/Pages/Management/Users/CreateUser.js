import {useState, useContext} from 'react';
import PageWrapper from '../../../Components/PageWrapper';
import UserForm from './UserForm';
import axios from 'axios';
import {AppContext} from '../../../Contexts/AppContext';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import BackButton from '../../../Components/BackButton';
import {getIsValid, getValidationMessage, isFormValid} from './UserValidation';

function CreateUser() {
  const {state} = useContext(AppContext);
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const validationMessages = {
    firstName: 'Ad 3 ile 20 karakter arasında olmalıdır.',
    lastName: 'Soyad 3 ile 20 karakter arasında olmalıdır.',
    username: 'Kullanıcı Adı 3 ile 20 karakter arasında olmalıdır.',
    password: 'Şifre en az 8 karakter arasında olmalıdır.',
  };

  const initialFormValues = {
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
    username: {
      value: '',
      isValid: false,
      validationMessage: validationMessages.username,
    },
    password: {
      value: '',
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

  const createUser = async () => {
    try {
      setIsCreating(true);

      const body = {
        firstName: formValues.firstName.value,
        lastName: formValues.lastName.value,
        username: formValues.username.value,
        password: formValues.password.value,
        role: formValues.role.value,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      };

      const {data} = await axios.post(
        `${process.env.REACT_APP_API}/user`,
        body,
        config
      );
      navigate(`/management/users/${data.id}`);

      toast.success(`${data.username} kullanıcısı başarıyla oluşturuldu.`);
    } catch (error) {
      if (error.response.status === 409) {
        toast.error('Bu kullanıcı adı zaten kullanılıyor.');
      } else {
        toast.error('Kullanıcı oluşturulamadı. ' + error);
      }
    } finally {
      setIsCreating(false);
    }
  };

  const handleSubmitCreate = async (e) => {
    e.preventDefault();

    if (!isFormValid(formValues)) return;

    await createUser();

    setFormValues(initialFormValues);
  };

  return (
    <PageWrapper title="Create User | Management">
      <BackButton />
      <UserForm
        title={'Yeni Kullanıcı'}
        handleSubmit={handleSubmitCreate}
        handleChange={handleChangeInput}
        formValues={formValues}
        isFormValid={isFormValid}
        isSaving={isCreating}
      />
    </PageWrapper>
  );
}

export default CreateUser;
