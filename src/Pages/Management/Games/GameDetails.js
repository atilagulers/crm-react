import React, {useContext, useEffect, useState} from 'react';
import PageWrapper from '../../../Components/PageWrapper';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {AppContext} from '../../../Contexts/AppContext';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import GameForm from './GameForm';
import {validationMessages, isFormValid} from './GameValidation';
import BackButton from '../../../Components/BackButton';

function GameDetails() {
  const {state} = useContext(AppContext);
  const navigate = useNavigate();
  const {id: gameId} = useParams();
  const [game, setGame] = useState();

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

  const handleClickEdit = () => {
    navigate('edit');
  };

  if (!game) return <LoadingSpinner />;
  return (
    <PageWrapper title="User Details | Management">
      <BackButton />
      <GameForm
        title={'Oyun Detayları'}
        //handleSubmit={handleSubmitUpdate}
        //handleChange={handleChangeInput}
        formValues={formValues}
        isFormValid={isFormValid}
        //isSaving={isUpdating}
        handleClickEdit={handleClickEdit}
        showSubmitButton={false}
        showEditButton={true}
        submitButtonText={'Güncelle'}
        disabled={true}
      />
    </PageWrapper>
  );
}

export default GameDetails;
