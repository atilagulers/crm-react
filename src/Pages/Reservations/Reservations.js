import React, {useEffect} from 'react';
import PageWrapper from '../../Components/PageWrapper';
import {Container, Button} from 'react-bootstrap';
import {Routes, Route, useNavigate} from 'react-router-dom';

function Reservations() {
  const navigate = useNavigate();

  const handleClickPlannedToday = () => {
    navigate('today');
  };

  const handleClickWillCome = () => {
    navigate('future');
  };

  const handleClickReservationHistory = () => {
    navigate('history');
  };

  const handleClickCreateReservation = () => {
    navigate('create');
  };

  return (
    <PageWrapper title="Reservations">
      <Container className="p-3 px-0 my-3">
        <Button onClick={handleClickPlannedToday} className="me-3">
          Bugüne Planlanan
        </Button>

        <Button onClick={handleClickWillCome} className="me-3">
          Gelecekler
        </Button>

        <Button onClick={handleClickReservationHistory} className="me-3">
          Rezervasyon Geçmişi
        </Button>

        <Button onClick={handleClickCreateReservation} className="me-3">
          Rezervasyon Oluştur
        </Button>
      </Container>
      {/*<Routes>
        <Route path="/" element={<ListCustomers />} />
        <Route path="/hold" element={<HoldingCustomers />} />

        <Route path="/create" element={<CreateCustomer />} />
        <Route
          path="/create-group"
          element={<CreateCustomerGroup title={'Yeni Müşteri Grubu'} />}
        />
        <Route path="/customer-groups" element={<ListCustomerGroups />} />
        <Route path="/customer-groups/:id" element={<CustomerGroupDetails />} />
        <Route
          path="/customer-groups/:id/edit"
          element={<EditCustomerGroup />}
        />

        <Route path="/:id" element={<CustomerDetails />} />
        <Route path="/:id/edit" element={<EditCustomer />} />
      </Routes>*/}
    </PageWrapper>
  );
}

export default Reservations;
