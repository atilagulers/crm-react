import React, {useEffect} from 'react';
import {Table} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

function GameTable({games}) {
  const navigate = useNavigate();

  const handleClickRow = (gameId) => {
    navigate(`${gameId}`);
  };

  return (
    <Table
      className="table game-table table-striped table-dark table-hover"
      striped
      bordered
      hover
      variant="dark"
    >
      <thead>
        <tr className="table-dark">
          <th>Oyun Adı</th>
        </tr>
      </thead>
      <tbody>
        {games &&
          games.map((game, i) => {
            return (
              <tr onClick={() => handleClickRow(game.id)} key={i}>
                <td>{game.name}</td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
}

export default GameTable;
