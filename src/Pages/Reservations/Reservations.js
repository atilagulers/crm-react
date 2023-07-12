import React, {useEffect} from 'react';
import PageWrapper from '../../Components/PageWrapper';
import {Container, Button} from 'react-bootstrap';
import {Routes, Route, useNavigate} from 'react-router-dom';
import HoldingReservations from './HoldingReservations';
import CreateReservation from './CreateReservation';
import TodayReservations from './TodayReservations';
import FutureReservations from './FutureReservations';
import ReservationHistory from './ReservationHistory';

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

  const handleClickHoldingReservations = () => {
    navigate('hold');
  };

  return (
    <PageWrapper title="Reservations">
      <Container className="p-3 px-0 my-3">
        <Button onClick={handleClickPlannedToday} className="me-3">
          Bugüne Planlanan
        </Button>

        <Button onClick={handleClickWillCome} className="me-3">
          Gelecek Rezervasyonlar
        </Button>

        <Button onClick={handleClickReservationHistory} className="me-3">
          Rezervasyon Geçmişi
        </Button>

        <Button onClick={handleClickCreateReservation} className="me-3">
          Rezervasyon Oluştur
        </Button>

        <Button onClick={handleClickHoldingReservations} className="me-3">
          Rezervasyon Bekleyen Müşteriler
        </Button>
      </Container>
      <Routes>
        {/*<Route path="/" element={<ListCustomers />} />*/}
        <Route path="/hold" element={<HoldingReservations />} />

        <Route path="/create" element={<CreateReservation />} />
        <Route path="/history" element={<ReservationHistory />} />
        <Route path="/today" element={<TodayReservations />} />
        <Route path="/future" element={<FutureReservations />} />
        {/*<Route path="/customer-groups" element={<ListCustomerGroups />} />
        <Route path="/customer-groups/:id" element={<CustomerGroupDetails />} />
        <Route
          path="/customer-groups/:id/edit"
          element={<EditCustomerGroup />}
        />

        <Route path="/:id" element={<CustomerDetails />} />
        <Route path="/:id/edit" element={<EditCustomer />} />*/}
      </Routes>
    </PageWrapper>
  );
}

export default Reservations;
