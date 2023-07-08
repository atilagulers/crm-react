import {Table} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleInfo} from '@fortawesome/free-solid-svg-icons';

function GameTable({games}) {
  const navigate = useNavigate();

  const handleClickGame = (gameId) => {
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
          <th style={{width: '5%'}}>Detay</th>
          <th>Oyun Adı</th>
        </tr>
      </thead>
      <tbody>
        {games &&
          games.map((game, i) => {
            return (
              <tr key={i}>
                <td onClick={(e) => handleClickGame(game._id)}>
                  <FontAwesomeIcon className="p-2" icon={faCircleInfo} />
                </td>
                <td>{game.name}</td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
}

export default GameTable;
