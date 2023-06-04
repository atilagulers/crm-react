import PageWrapper from '../../../Components/PageWrapper';
import UserForm from './UserForm';

function CreateUser() {
  return (
    <PageWrapper title="Create User | Management">
      <UserForm title={'Yeni Kullanıcı'} />
    </PageWrapper>
  );
}

export default CreateUser;
