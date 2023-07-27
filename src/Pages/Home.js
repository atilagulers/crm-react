import PageWrapper from '../Components/PageWrapper';
import {AppContext} from '../Contexts/AppContext';
import {useContext} from 'react';

function Home() {
  const {state} = useContext(AppContext);

  return (
    <PageWrapper title="Home">
      <h1>{`👋 ${state.user.firstName} ${state.user.lastName}`}</h1>
    </PageWrapper>
  );
}

export default Home;
