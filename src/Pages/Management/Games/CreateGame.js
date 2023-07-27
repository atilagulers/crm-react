import React, {useContext, useState} from 'react';
import GameForm from './GameForm';
import PageWrapper from '../../../Components/PageWrapper';
import {AppContext} from '../../../Contexts/AppContext';
import {toast} from 'react-toastify';
import axios from 'axios';
import {getIsValid, getValidationMessage, isFormValid} from './GameValidation';
import {useNavigate} from 'react-router-dom';
import BackButton from '../../../Components/BackButton';

function CreateGame() {
  const {state} = useContext(AppContext);
  const navigate = useNavigate();
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
        validationMessage: getValidationMessage(
          e.target.name,
          e.target.value,
          formValues
        ),
      },
    }));
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
        `${process.env.REACT_APP_API}/game`,
        body,
        config
      );
      navigate(`/management/games/${data._id}`);

      toast.success(`${data.name} oyunu başarıyla oluşturuldu.`);
    } catch (error) {
      console.log(error);
      if (error.response.status === 409) {
        toast.error('Bu oyun adı zaten kullanılıyor.');
      } else {
        toast.error('Oyun oluşturulamadı. ' + error);
      }
    } finally {
      setIsCreating(false);
    }
  };

  const handleSubmitCreate = async (e) => {
    e.preventDefault();

    if (!isFormValid(formValues)) return;

    await createGame();

    setFormValues(initialFormValues);
  };

  return (
    <PageWrapper title="Create Game | Management">
      <BackButton />
      <GameForm
        title={'Yeni Oyun'}
        handleSubmit={handleSubmitCreate}
        handleChange={handleChangeInput}
        formValues={formValues}
        isFormValid={isFormValid}
        isSaving={isCreating}
      />
    </PageWrapper>
  );
}

export default CreateGame;
