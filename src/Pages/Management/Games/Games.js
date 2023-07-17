import PageWrapper from '../../../Components/PageWrapper';
import {Routes, Route} from 'react-router-dom';
import ListGames from './ListGames';
import CreateGame from './CreateGame';
import GameDetails from './GameDetails';
import EditGame from './EditGame';

function Games() {
  //const handleClickCreate = () => {
  //  navigate('create');
  //};
  //const handleClickList = () => {
  //  navigate('/management/games');
  //};

  return (
    <PageWrapper title={'Games | Management'}>
      {/*<Container className="p-3 px-0 my-3">
        <Button onClick={handleClickList} className="me-3">
          Oyunları Listele
        </Button>
        <Button onClick={handleClickCreate}>Oyun Oluştur</Button>
      </Container>*/}
      <Routes>
        <Route path="/" element={<ListGames />} />
        <Route path="/create" element={<CreateGame />} />
        <Route path="/:id" element={<GameDetails />} />
        <Route path="/:id/edit" element={<EditGame />} />
      </Routes>
    </PageWrapper>
  );
}

export default Games;
