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
import LoadingSpinner from '../../Components/LoadingSpinner';

function ResrvationDetails() {
  const {state} = useContext(AppContext);
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
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
    setIsFetching(true);

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
      } finally {
        setIsFetching(false);
      }
    };
    fetchReservationById();
  }, [reservationId, state.token]);

  const handleClickEdit = async (e) => {
    navigate('edit');
  };

  const checkDepartureDate = () => {
    const targetDate = new Date(formValues.departureDate.value);
    const currentDate = new Date();
    targetDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    return targetDate >= currentDate;
  };

  if (isFetching) <LoadingSpinner />;

  return (
    <PageWrapper title="Create User | Management">
      <BackButton />

      <ReservationForm
        title={'Rezervasyon Detayları'}
        handleClickEdit={handleClickEdit}
        handleChange={handleChangeInput}
        formValues={formValues}
        isFormValid={isFormValid}
        selectedCustomer={selectedCustomer}
        setSelectedCustomer={setSelectedCustomer}
        phoneFormHidden={true}
        disabled={true}
        showEditButton={checkDepartureDate()}
        showSubmitButton={false}
      />
    </PageWrapper>
  );
}

export default ResrvationDetails;
