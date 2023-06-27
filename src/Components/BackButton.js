import {Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import '../Css/Components/BackButton.css';

function BackButton() {
  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <Button
      className="back-button text-light mb-2"
      variant="dark"
      onClick={handleBackButtonClick}
    >
      &#8592; Geri
    </Button>
  );
}

export default BackButton;
