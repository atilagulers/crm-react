import React, {useContext, useState} from 'react';
import PageWrapper from '../../../Components/PageWrapper';
import AirlineForm from './AirlineForm';
import {AppContext} from '../../../Contexts/AppContext';
import {toast} from 'react-toastify';
import axios from 'axios';
import {
  validationMessages,
  getIsValid,
  getValidationMessage,
  isFormValid,
} from './AirlineValidation';
import {useNavigate} from 'react-router-dom';
import BackButton from '../../../Components/BackButton';

function CreateAirline() {
  const {state} = useContext(AppContext);
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);

  const initialFormValues = {
    name: {
      value: '',
      isValid: false,
      validationMessage: validationMessages.name,
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

  const createAirline = async () => {
    try {
      setIsCreating(true);

      const body = {
        name: formValues.name.value,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      };

      const {data} = await axios.post(
        `${process.env.REACT_APP_API}/airline`,
        body,
        config
      );
      navigate(`/management/airlines/${data._id}`);

      toast.success(`${data.name} havayolu başarıyla oluşturuldu.`);
    } catch (error) {
      if (error.response.status === 409) {
        toast.error('Bu havayolu adı zaten kullanılıyor.');
      } else {
        toast.error('Havayolu oluşturulamadı. ' + error);
      }
    } finally {
      setIsCreating(false);
    }
  };

  const handleSubmitCreate = async (e) => {
    e.preventDefault();

    if (!isFormValid(formValues)) return;

    await createAirline();

    setFormValues(initialFormValues);
  };
  return (
    <PageWrapper title="Create Airline | Management">
      <BackButton />
      <AirlineForm
        title={'Yeni Havayolu'}
        handleSubmit={handleSubmitCreate}
        handleChange={handleChangeInput}
        formValues={formValues}
        isFormValid={isFormValid}
        isCreating={isCreating}
      />
    </PageWrapper>
  );
}

export default CreateAirline;
