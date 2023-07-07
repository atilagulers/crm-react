import {Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import '../Css/Components/BackButton.css';
import {Container} from 'react-bootstrap';

function BackButton() {
  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <Container className="p-0" style={{margin: '0% auto'}}>
      <Button
        className="back-button text-light mb-2"
        variant="dark"
        onClick={handleBackButtonClick}
      >
        &#8592; Geri
      </Button>
    </Container>
  );
}

export default BackButton;
