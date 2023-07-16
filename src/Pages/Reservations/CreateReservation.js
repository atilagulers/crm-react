import {useState, useContext} from 'react';
import PageWrapper from '../../Components/PageWrapper';
import ReservationForm from './ReservationForm';
import axios from 'axios';
import {AppContext} from '../../Contexts/AppContext';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import BackButton from '../../Components/BackButton';

import {
  getIsValid,
  getValidationMessage,
  isFormValid,
  validationMessages,
} from './ReservationValidation';

function CreateReservation() {
  const {state} = useContext(AppContext);
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState();

  const initialFormValues = {
    customer: {
      value: '',
      isValid: true,
      validationMessage: validationMessages.customer,
    },
    hotel: {
      value: '',
      isValid: true,
      validationMessage: validationMessages.hotel,
    },
    departureAirline: {
      value: '',
      isValid: true,
      validationMessage: validationMessages.departureAirline,
    },
    departureDate: {
      value: '',
      isValid: false,
      validationMessage: validationMessages.departureDate,
    },
    departureTime: {
      value: '00:00',
      isValid: true,
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
    arrivalAirline: {
      value: '',
      isValid: true,
      validationMessage: validationMessages.arrivalAirline,
    },
    arrivalDate: {
      value: '',
      isValid: false,
      validationMessage: validationMessages.arrivalDate,
    },
    arrivalTime: {
      value: '00:00',
      isValid: true,
      validationMessage: validationMessages.arrivalTime,
    },
    arrivalDestination: {
      value: '',
      isValid: false,
      validationMessage: validationMessages.arrivalDestination,
    },
    arrivalPNR: {
      value: '',
      isValid: false,
      validationMessage: validationMessages.arrivalPNR,
    },
    user: {
      value: '',
      isValid: true,
      validationMessage: validationMessages.user,
    },
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  const handleChangeInput = (e) => {
    const {name, value} = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: {
        value,
        isValid: getIsValid(name, value),
        validationMessage: getValidationMessage(name, value, formValues),
      },
    }));
  };

  const createReservation = async () => {
    try {
      setIsCreating(true);

      const departureDate = new Date(formValues.departureDate.value);
      const arrivalDate = new Date(formValues.arrivalDate.value);
      const currentDate = new Date();

      departureDate.setHours(0, 0, 0, 0);
      arrivalDate.setHours(0, 0, 0, 0);
      currentDate.setHours(0, 0, 0, 0);

      if (departureDate < currentDate) {
        toast.error(
          'Geçersiz gidiş tarihi. Gidiş tarihi bugünden önce olamaz.'
        );
        return;
      }

      if (arrivalDate < currentDate) {
        toast.error(
          'Geçersiz dönüş tarihi. Dönüş tarihi bugünden önce olamaz.'
        );
        return;
      }

      if (arrivalDate < departureDate) {
        toast.error(
          'Geçersiz dönüş tarihi. Dönüş tarihi gidiş tarihinden önce olamaz.'
        );
        return;
      }

      const body = {
        customer: formValues.customer.value,
        hotel: formValues.hotel.value,
        departureAirline: formValues.departureAirline.value,
        departureDate: formValues.departureDate.value,
        departureTime: formValues.departureTime.value,
        departureDestination: formValues.departureDestination.value,
        departurePNR: formValues.departurePNR.value,
        arrivalAirline: formValues.arrivalAirline.value,
        arrivalDate: formValues.arrivalDate.value,
        arrivalTime: formValues.arrivalTime.value,
        arrivalDestination: formValues.arrivalDestination.value,
        arrivalPNR: formValues.arrivalPNR.value,
        user: formValues.user.value,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      };

      const {data} = await axios.post(
        `${process.env.REACT_APP_API}/reservation`,
        body,
        config
      );

      await updateCustomer();

      navigate(`/reservations/${data._id}`);

      toast.success(`Rezervasyon başarıyla oluşturuldu.`);
    } catch (error) {
      if (error.response.status === 409) {
        toast.error('Bu rezervasyon adı zaten kullanılıyor.');
      } else {
        toast.error('Rezervasyon oluşturulamadı. ' + error);
      }
    } finally {
      setIsCreating(false);
    }
  };

  const updateCustomer = async () => {
    try {
      setIsCreating(true);

      const body = {
        waitingReservation: false,
        isReserved: true,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      };

      await axios.patch(
        `${process.env.REACT_APP_API}/customer/${selectedCustomer._id}`,
        body,
        config
      );

      toast.success(`Müşteri güncellendi oluşturuldu.`);
    } catch (error) {
      toast.error('Müşteri güncellenemedi. ' + error);
      console.log(error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleSubmitCreate = async (e) => {
    e.preventDefault();

    if (!isFormValid(formValues)) return;

    await createReservation();

    //setFormValues(initialFormValues);
  };

  return (
    <PageWrapper title="Create User | Management">
      <BackButton />

      <ReservationForm
        title={'Yeni Rezervasyon'}
        handleSubmit={handleSubmitCreate}
        handleChange={handleChangeInput}
        formValues={formValues}
        isFormValid={isFormValid}
        isCreating={isCreating}
        selectedCustomer={selectedCustomer}
        setSelectedCustomer={setSelectedCustomer}
      />
    </PageWrapper>
  );
}

export default CreateReservation;
