import React from 'react';
import PageWrapper from '../../../Components/PageWrapper';
import {Route, Routes} from 'react-router-dom';
import ListAirlines from './ListAirlines';
import CreateAirline from './CreateAirline';

function Airlines() {
  return (
    <PageWrapper title={'Airlines | Management'}>
      <Routes>
        <Route path="/" element={<ListAirlines />} />
        <Route path="/create" element={<CreateAirline />} />
        {/*<Route path="/:id" element={<AirlineDetails />} />*/}
      </Routes>
    </PageWrapper>
  );
}

export default Airlines;
