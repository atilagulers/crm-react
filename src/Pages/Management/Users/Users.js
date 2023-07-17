import PageWrapper from '../../../Components/PageWrapper';
import {Routes, Route} from 'react-router-dom';

import './Style/Users.css';
import ListUsers from './ListUsers';
import CreateUser from './CreateUser';
import UserDetails from './UserDetails';
import EditUser from './EditUser';

function Users() {
  return (
    <PageWrapper title={'Users | Management'}>
      {/*<Container className="p-3 px-0 my-3">
        <Button onClick={handleClickList} className="me-3">
          Kullanıcıları Listele
        </Button>
        <Button onClick={handleClickCreate}>Kullanıcı Oluştur</Button>
      </Container>*/}
      <Routes>
        <Route path="/" element={<ListUsers />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/:id" element={<UserDetails />} />
        <Route path="/:id/edit" element={<EditUser />} />
      </Routes>
    </PageWrapper>
  );
}

export default Users;
