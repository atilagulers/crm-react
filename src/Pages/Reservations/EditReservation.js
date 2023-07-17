import {useState, useContext, useEffect} from 'react';
import PageWrapper from '../../Components/PageWrapper';
import ReservationForm from './ReservationForm';
import axios from 'axios';
import {AppContext} from '../../Contexts/AppContext';
import {toast} from 'react-toastify';
import {useNavigate, useParams} from 'react-router-dom';
import BackButton from '../../Components/BackButton';

import {
  getIsValid,
  getValidationMessage,
  isFormValid,
  validationMessages,
} from './ReservationValidation';
import {formatDate} from '../../Helpers';

function EditReservation() {
  const {state} = useContext(AppContext);
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState();
  const {id: reservationId} = useParams();

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

  function convertDateFormat(date) {
    const dateString = formatDate(date);
    const parts = dateString.split('.');
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  useEffect(() => {
    const fetchReservationById = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        };

        const {data: reservation} = await axios.get(
          `${process.env.REACT_APP_API}/reservation/${reservationId}`,
          config
        );

        const updatedFormValues = {
          customer: {
            value: reservation.customer._id || '',
            isValid: true,
            validationMessage: validationMessages.customer,
          },
          hotel: {
            value: reservation.hotel._id || '',
            isValid: true,
            validationMessage: validationMessages.hotel,
          },
          departureAirline: {
            value: reservation.departureAirline._id || '',
            isValid: true,
            validationMessage: validationMessages.departureAirline,
          },
          departureDate: {
            value: convertDateFormat(reservation.departureDate) || '',
            isValid: true,
            validationMessage: validationMessages.departureDate,
          },
          departureTime: {
            value: reservation.departureTime || '',
            isValid: true,
            validationMessage: validationMessages.departureTime,
          },
          departureDestination: {
            value: reservation.departureDestination || '',
            isValid: true,
            validationMessage: validationMessages.departureDestination,
          },
          departurePNR: {
            value: reservation.departurePNR || '',
            isValid: true,
            validationMessage: validationMessages.departurePNR,
          },
          arrivalAirline: {
            value: reservation.arrivalAirline._id || '',
            isValid: true,
            validationMessage: validationMessages.arrivalAirline,
          },
          arrivalDate: {
            value: convertDateFormat(reservation.arrivalDate) || '',
            isValid: true,
            validationMessage: validationMessages.arrivalDate,
          },
          arrivalTime: {
            value: reservation.arrivalTime || '',
            isValid: true,
            validationMessage: validationMessages.arrivalTime,
          },
          arrivalDestination: {
            value: reservation.arrivalDestination || '',
            isValid: true,
            validationMessage: validationMessages.arrivalDestination,
          },
          arrivalPNR: {
            value: reservation.arrivalPNR || '',
            isValid: true,
            validationMessage: validationMessages.arrivalPNR,
          },
          user: {
            value: reservation.user._id || '',
            isValid: true,
            validationMessage: validationMessages.user,
          },
        };

        reservation.customer.user = [reservation.user];

        setFormValues(updatedFormValues);
        setSelectedCustomer(reservation.customer);
      } catch (error) {
        console.log(error);
        toast.error(`Rezervasyon bulunamadı.`);
      }
    };
    fetchReservationById();
  }, [reservationId, state.token]);

  const updateReservation = async () => {
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
          'Geçersiz kalkış tarihi. Kalkış tarihi bugünden önce olamaz.'
        );
        return;
      }

      if (arrivalDate < currentDate) {
        toast.error(
          'Geçersiz varış tarihi. Varış tarihi bugünden önce olamaz.'
        );
        return;
      }

      if (arrivalDate < departureDate) {
        toast.error(
          'Geçersiz varış tarihi. Varış tarihi gidiş tarihinden önce olamaz.'
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

      const {data} = await axios.patch(
        `${process.env.REACT_APP_API}/reservation/${reservationId}`,
        body,
        config
      );

      await updateCustomer();

      navigate(`/reservations/${data._id}`);

      toast.success(`Rezervasyon başarıyla Güncellendi.`);
    } catch (error) {
      console.log(error);
      if (error.response.status === 409) {
        toast.error('Bu rezervasyon adı zaten kullanılıyor.');
      } else {
        toast.error('Rezervasyon güncellenemedi.');
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

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    if (!isFormValid(formValues)) return;

    await updateReservation();

    //setFormValues(initialFormValues);
  };

  return (
    <PageWrapper title="Create User | Management">
      <BackButton />

      <ReservationForm
        title={'Rezervasyon Güncelle'}
        handleSubmit={handleSubmitEdit}
        handleChange={handleChangeInput}
        formValues={formValues}
        isFormValid={isFormValid}
        isCreating={isCreating}
        selectedCustomer={selectedCustomer}
        setSelectedCustomer={setSelectedCustomer}
        phoneFormHidden={true}
        submitButtonText="Güncelle"
      />
    </PageWrapper>
  );
}

export default EditReservation;
