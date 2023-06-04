import React, {useEffect} from 'react';
import {Container, Button, Form, Row, Col} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

function CreateCustomerGroup({title}) {
  const navigate = useNavigate();

  return (
    <Container className=" p-0 bg-light-dark " style={{margin: '0% auto'}}>
      <Button
        onClick={() => navigate(-1)}
        variant="link"
        className="text-light"
      >
        {'\u003C'} Geri
      </Button>
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
              <Form.Label>Müşteri Grubu Adı:</Form.Label>
              <Form.Control type="text" placeholder="Yetişkin" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Açıklama:</Form.Label>
              <Form.Control type="text" placeholder="Bu grup 18 yaş üstü" />
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

export default CreateCustomerGroup;
