import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Users from './Users/Users';
import Hotels from './Hotels/Hotels';
import Games from './Games/Games';
import Airlines from './Airlines/Airlines';

function Management() {
  return (
    <Routes>
      <Route path="/users/*" element={<Users />} />
      <Route path="/hotels/*" element={<Hotels />} />
      <Route path="/games/*" element={<Games />} />
      <Route path="/airlines/*" element={<Airlines />} />
    </Routes>
  );
}

export default Management;
