import {Container, Form, Row, Col, Button} from 'react-bootstrap';
//import {useNavigate} from 'react-router-dom';

function UserForm({title, user}) {
  //const navigate = useNavigate();

  return (
    <Container className=" p-0 bg-light-dark " style={{margin: '0% auto'}}>
      {/*<Button
        onClick={() => navigate(-1)}
        variant="link"
        className="text-light"
      >
        {'\u003C'} Geri
      </Button>*/}
      <Container className="p-3 bg-primary">
        <h3>{title}</h3>
      </Container>
      <Form className="p-5">
        <Row className="d-flex justify-content-between">
          <Col>
            <Form.Group
              className="mb-3 ms"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Adı:</Form.Label>
              <Form.Control type="text" placeholder="Atila" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Soyadı:</Form.Label>
              <Form.Control type="text" placeholder="Güler" />
            </Form.Group>
          </Col>
        </Row>
        <Row className="d-flex justify-content-between mb-3">
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Kullanıcı Adı:</Form.Label>
              <Form.Control type="text" placeholder="atilaguler" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Kullanıcı Şifre:</Form.Label>
              <Form.Control type="password" placeholder="Şifre" />
            </Form.Group>
          </Col>
        </Row>
        <Container className="d-flex justify-content-end px-0">
          <Button type="submit" size="lg">
            Kaydet
          </Button>
        </Container>
      </Form>
    </Container>
  );
}

export default UserForm;
