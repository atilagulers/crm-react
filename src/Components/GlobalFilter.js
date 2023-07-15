import {Container} from 'react-bootstrap';

function GlobalFilter({filter, setFilter}) {
  return (
    <Container className="p-3 ps-0">
      Arama:{' '}
      <input value={filter || ''} onChange={(e) => setFilter(e.target.value)} />
    </Container>
  );
}

export default GlobalFilter;
