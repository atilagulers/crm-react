import React, {useContext} from 'react';
import PageWrapper from '../Components/PageWrapper';
import {AppContext} from '../Contexts/AppContext';

function Home() {
  const {state, dispatch} = useContext(AppContext);

  return (
    <PageWrapper title="Home">
      <h1>Home Page</h1>
      {console.log(state)}
    </PageWrapper>
  );
}

export default Home;
