import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import GameForm from './GameForm';
import PageWrapper from '../../../Components/PageWrapper';

function CreateGame() {
  const navigate = useNavigate();
  return (
    <PageWrapper title="Create Game | Management">
      <GameForm />
    </PageWrapper>
  );
}

export default CreateGame;
