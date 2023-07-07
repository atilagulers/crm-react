import React, {useEffect} from 'react';
import PageWrapper from '../../Components/PageWrapper';
import {Container, Button} from 'react-bootstrap';
import {Routes, Route, useNavigate} from 'react-router-dom';
import PlannedForToday from './PlannedForToday';
import WillBeCalled from './WillBeCalled';
import CallHistory from './CallHistory';

function CallLists() {
  const navigate = useNavigate();

  const handleClickListToday = () => {
    navigate('today');
  };

  const handleClickListToBeCalled = () => {
    navigate('future');
  };

  const handleClickListCallHistory = () => {
    navigate('history');
  };

  return (
    <PageWrapper title={'Call Lists'}>
      <Container className="p-3 px-0 my-3">
        <Button onClick={handleClickListToday} className="me-3">
          Bugüne Planlanan
        </Button>
        <Button onClick={handleClickListToBeCalled} className="me-3">
          Aranacaklar
        </Button>

        <Button onClick={handleClickListCallHistory} className="me-3">
          Arama Geçmişi
        </Button>
      </Container>
      <Routes>
        <Route path="/future" element={<PlannedForToday />} />
        <Route path="/today" element={<WillBeCalled />} />
        <Route path="/history" element={<CallHistory />} />

        {/*<Route path="/:id" element={<AirlineDetails />} />*/}
      </Routes>
    </PageWrapper>
  );
}

export default CallLists;
