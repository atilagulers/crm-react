import {useEffect} from 'react';
import {Container} from 'react-bootstrap';

function PageWrapper({title, children}) {
  useEffect(() => {
    document.title = `${title}`;
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <Container fluid className="p-0 m-0">
      {children}
    </Container>
  );
}

export default PageWrapper;
