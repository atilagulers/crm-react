import React, {useEffect} from 'react';
import {Container} from 'react-bootstrap';
import GameTable from './GameTable';

function ListGames() {
  const games = [
    {
      id: 0,
      name: 'Poker',
    },
    {
      id: 1,
      name: 'Roulette',
    },
    {
      id: 2,
      name: 'Blackjack',
    },
  ];

  return (
    <Container className="p-0">
      <GameTable games={games} />
    </Container>
  );
}

export default ListGames;
