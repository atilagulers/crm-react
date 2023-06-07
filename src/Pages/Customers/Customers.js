import React from 'react';
import PageWrapper from '../../Components/PageWrapper';
import {Container, Button} from 'react-bootstrap';
import {Routes, Route, useNavigate} from 'react-router-dom';
import ListCustomers from './ListCustomers';
import CustomerDetails from './CustomerDetails';
import ListCustomerGroups from './ListCustomerGroups';
import CreateCustomer from './CreateCustomer';
import CreateCustomerGroup from './CreateCustomerGroup';

function Customers() {
  const navigate = useNavigate();

  const handleClickCreateCustomer = () => {
    navigate('create');
  };
  const handleClickCreateGroup = () => {
    navigate('create-group');
  };

  const handleClickListCustomers = () => {
    navigate('/customers');
  };
  const handleClickListGroups = () => {
    navigate('customer-groups');
  };
  return (
    <PageWrapper title={'Customers'}>
      <Container className="p-3 px-0 my-3">
        <Button onClick={handleClickListCustomers} className="me-3">
          Müşterileri Listele
        </Button>
        <Button onClick={handleClickListGroups} className="me-3">
          Müşteri Gruplarını Listele
        </Button>
        <Button onClick={handleClickCreateCustomer} className="me-3">
          Müşteri Oluştur
        </Button>
        <Button onClick={handleClickCreateGroup} className="me-3">
          Müşteri Grubu Oluştur
        </Button>
      </Container>
      <Routes>
        <Route path="/" element={<ListCustomers />} />
        <Route path="/create" element={<CreateCustomer />} />
        <Route
          path="/create-group"
          element={<CreateCustomerGroup title={'Yeni Müşteri Grubu'} />}
        />
        <Route path="/customer-groups" element={<ListCustomerGroups />} />

        <Route path="/:id" element={<CustomerDetails />} />
      </Routes>
    </PageWrapper>
  );
}

export default Customers;
