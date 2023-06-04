import React, {useEffect} from 'react';
import PageWrapper from '../../../Components/PageWrapper';
import UserForm from './UserForm';

function UserDetails() {
  return (
    <PageWrapper title="User Details | Management">
      <UserForm />
    </PageWrapper>
  );
}

export default UserDetails;
