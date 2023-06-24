import React, {useContext, useState} from 'react';
import PageWrapper from '../../../Components/PageWrapper';
import AirlineForm from './AirlineForm';
import {AppContext} from '../../../Contexts/AppContext';
import {toast} from 'react-toastify';
import axios from 'axios';

function CreateAirline() {
  const {state} = useContext(AppContext);

  const [isCreating, setIsCreating] = useState(false);
  const validationMessages = {
    name: 'Ad 3 ile 30 karakter arasında olmalıdır.',
  };
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
        validationMessage: getValidationMessage(e.target.name, e.target.value),
      },
    }));
  };

  const getIsValid = (field, value) => {
    if (field === 'name') return value.length >= 3 && value.length <= 20;
  };

  const getValidationMessage = (field, value = '') => {
    if (field === 'name' && !formValues[field].isValid) {
      return validationMessages.name;
    }
    return '';
  };

  const isFormValid = () => {
    return Object.values(formValues).every((field) => field.isValid);
  };

  const createGame = async () => {
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

      toast.success(`${data.name} havayolu başarıyla oluşturuldu.`);
    } catch (error) {
      console.log(error);
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

    if (!isFormValid()) return;

    await createGame();

    setFormValues(initialFormValues);
  };
  return (
    <PageWrapper title="Create Airline | Management">
      <AirlineForm
        title={'Yeni Havayolu'}
        handleSubmitCreate={handleSubmitCreate}
        handleChange={handleChangeInput}
        formValues={formValues}
        isFormValid={isFormValid}
        isCreating={isCreating}
      />
    </PageWrapper>
  );
}

export default CreateAirline;
