import PageWrapper from '../../../Components/PageWrapper';
import {Routes, Route} from 'react-router-dom';

import CreateHotel from './CreateHotel';
import ListHotels from './ListHotels';
import HotelDetails from './HotelDetails';
import EditHotel from './EditHotel';

function Hotels() {
  //const handleClickCreate = () => {
  //  navigate('create');
  //};

  //const handleClickList = () => {
  //  navigate('/management/hotels');
  //};
  return (
    <PageWrapper title={'Hotels | Management'}>
      {/*<Container className="p-3 px-0 my-3">
        <Button onClick={handleClickList} className="me-3">
          Otelleri Listele
        </Button>
        <Button onClick={handleClickCreate}>Otel Oluştur</Button>
      </Container>*/}
      <Routes>
        <Route path="/" element={<ListHotels />} />
        <Route path="/create" element={<CreateHotel />} />
        <Route path="/:id" element={<HotelDetails />} />
        <Route path="/:id/edit" element={<EditHotel />} />
      </Routes>
    </PageWrapper>
  );
}

export default Hotels;
