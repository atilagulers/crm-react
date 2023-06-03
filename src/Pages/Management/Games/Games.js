import React, {useEffect} from 'react';
import PageWrapper from '../../../Components/PageWrapper';
import {Routes, Route} from 'react-router-dom';
import ListGames from './ListGames';
import CreateGame from './CreateGame';
import GameDetails from './GameDetails';

function Games() {
  return (
    <PageWrapper title={'Games | Management'}>
      <Routes>
        <Route path="/" element={<ListGames />} />
        <Route path="/create" element={<CreateGame />} />
        <Route path="/:id" element={<GameDetails />} />
      </Routes>
    </PageWrapper>
  );
}

export default Games;
