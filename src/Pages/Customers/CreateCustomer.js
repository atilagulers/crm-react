import React, {useEffect} from 'react';
import PageWrapper from '../../Components/PageWrapper';
import CustomerForm from './CustomerForm';

function CreateCustomer() {
  return (
    <PageWrapper title="Create Customer">
      <CustomerForm title={'Yeni Müşteri'} />
    </PageWrapper>
  );
}

export default CreateCustomer;
