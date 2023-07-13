import React, {useEffect, useContext, useState} from 'react';
import PageWrapper from '../../../Components/PageWrapper';
import {useNavigate, useParams} from 'react-router-dom';
import {AppContext} from '../../../Contexts/AppContext';
import axios from 'axios';
import {toast} from 'react-toastify';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import GameForm from './GameForm';
import BackButton from '../../../Components/BackButton';

import {
  validationMessages,
  getIsValid,
  getValidationMessage,
  isFormValid,
} from './GameValidation';

function EditGame() {
  const {state} = useContext(AppContext);
  const navigate = useNavigate();
  const {id: gameId} = useParams();
  const [game, setGame] = useState();

  const [isUpdating, setIsUpdating] = useState(false);

  const initialFormValues = {
    name: {
      value: game ? game.name : '',
      isValid: false,
      validationMessage: validationMessages.name,
    },
  };
  const [formValues, setFormValues] = useState(initialFormValues);
  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchGame = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      };

      const {data} = await axios.get(
        `${process.env.REACT_APP_API}/game/${gameId}`,
        config
      );

      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        name: {
          ...prevFormValues.name,
          value: data.name || '',
          isValid: true,
        },
      }));

      setGame(data);
    };
    fetchGame();

    return () => {
      source.cancel();
    };
  }, [gameId, state.token]);

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
        name: formValues.name.value,
      };

      await axios.patch(
        `${process.env.REACT_APP_API}/game/${gameId}`,
        body,
        config
      );

      navigate(`/management/games/${gameId}`);
      toast.success(`Oyun güncellendi.`);

      return () => {
        source.cancel();
      };
    } catch (error) {
      if (error.response.status === 409) {
        toast.error('Bu oyun adı zaten kullanılıyor.');
      } else {
        toast.error('Oyun oluşturulamadı. ' + error);
      }
    } finally {
      setIsUpdating(false);
    }
  };
  if (!game) return <LoadingSpinner />;

  return (
    <PageWrapper title="User Details | Management">
      <BackButton />
      <GameForm
        title={'Oyun Güncelle'}
        handleSubmit={handleSubmitUpdate}
        handleChange={handleChangeInput}
        formValues={formValues}
        isFormValid={isFormValid}
        isSaving={isUpdating}
        disabled={false}
        showPasswordInput={false}
        showSubmitButton={true}
        submitButtonText={'Güncelle'}
      />
    </PageWrapper>
  );
}

export default EditGame;
