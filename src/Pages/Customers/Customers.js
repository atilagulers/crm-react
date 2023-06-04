import React from 'react';
import PageWrapper from '../../Components/PageWrapper';
import {Route, Routes} from 'react-router-dom';
import ListCustomers from './ListCustomers';
import ListCustomerGroups from './ListCustomerGroups';
import CreateCustomer from './CreateCustomer';
import CreateCustomerGroup from './CreateCustomerGroup';

function Airlines() {
  return (
    <PageWrapper title={'Customers'}>
      <Routes>
        <Route path="/" element={<ListCustomers />} />
        <Route path="/create" element={<CreateCustomer />} />
        <Route
          path="/create-group"
          element={<CreateCustomerGroup title={'Yeni Müşteri Grubu'} />}
        />
        <Route path="/customer-groups" element={<ListCustomerGroups />} />

        {/*<Route path="/:id" element={<AirlineDetails />} />*/}
      </Routes>
    </PageWrapper>
  );
}

export default Airlines;
