import {useState, useContext} from 'react';
import PageWrapper from '../../../Components/PageWrapper';
import UserForm from './UserForm';
import axios from 'axios';
import {AppContext} from '../../../Contexts/AppContext';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import BackButton from '../../../Components/BackButton';

function CreateReservation() {
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
    customer: {
      value: '',
      isValid: false,
      validationMessage: validationMessages.customer,
    },
    hotel: {
      value: '',
      isValid: false,
      validationMessage: validationMessages.hotel,
    },
    departureAirline: {
      value: '',
      isValid: false,
      validationMessage: validationMessages.departureAirline,
    },
    departureDate: {
      value: '',
      isValid: false,
      validationMessage: validationMessages.departureDate,
    },
    departureTime: {
      value: '',
      isValid: false,
      validationMessage: validationMessages.departureTime,
    },
    departureDestination: {
      value: '',
      isValid: false,
      validationMessage: validationMessages.departureDestination,
    },
    departurePNR: {
      value: '',
      isValid: false,
      validationMessage: validationMessages.departurePNR,
    },
    returnAirline: {
      value: '',
      isValid: false,
      validationMessage: validationMessages.returnAirline,
    },
    returnDate: {
      value: '',
      isValid: false,
      validationMessage: validationMessages.returnDate,
    },
    returnTime: {
      value: '',
      isValid: false,
      validationMessage: validationMessages.returnTime,
    },
    returnDestination: {
      value: '',
      isValid: false,
      validationMessage: validationMessages.returnDestination,
    },
    returnPNR: {
      value: '',
      isValid: false,
      validationMessage: validationMessages.returnPNR,
    },
    user: {
      value: '',
      isValid: false,
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
        validationMessage: getValidationMessage(e.target.name, e.target.value),
      },
    }));
  };

  const getIsValid = (field, value) => {
    if (field === 'firstName' || field === 'lastName' || field === 'username')
      return value.length >= 3 && value.length <= 20;

    if (field === 'password') return value.length >= 8;

    if (field === 'role') return true;
  };

  const getValidationMessage = (field, value = '') => {
    if (field === 'firstName' && !formValues[field].isValid) {
      return validationMessages.firstName;
    }
    if (field === 'lastName' && !formValues[field].isValid) {
      return validationMessages.lastName;
    }
    if (field === 'username' && !formValues[field].isValid) {
      return validationMessages.username;
    }
    if (field === 'password' && !formValues[field].isValid) {
      return validationMessages.password;
    }

    return '';
  };

  const isFormValid = () => {
    return Object.values(formValues).every((field) => field.isValid);
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

    if (!isFormValid()) return;

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
        isCreating={isCreating}
      />
    </PageWrapper>
  );
}

export default CreateReservation;
