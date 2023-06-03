import React, {useEffect} from 'react';
import {Container, Form, Row, Col, Table, Button} from 'react-bootstrap';
import {Routes, Route, useNavigate} from 'react-router-dom';
import GameTable from './GameTable';

function ListGames() {
  const navigate = useNavigate();
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

  const handleClickCreate = () => {
    navigate('create');
  };

  return (
    <Container className="p-0">
      <Container className="p-3 px-0">
        <Button onClick={handleClickCreate}>Oyun Oluştur</Button>
      </Container>
      <GameTable games={games} />
    </Container>
  );
}

export default ListGames;
