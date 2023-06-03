import React, {useEffect} from 'react';
import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

function GameForm() {
  const navigate = useNavigate();
  return (
    <Container className=" p-0 bg-light-dark mb-5" style={{margin: '0% auto'}}>
      <Button
        onClick={() => navigate(-1)}
        variant="link"
        className="text-light"
      >
        {'\u003C'} Geri
      </Button>
      <Container className="p-3 bg-primary">
        <h3>Yeni Oyun</h3>
      </Container>
      <Form className="p-5">
        <Row className="d-flex justify-content-between">
          <Col>
            <Form.Group
              className="mb-3 ms"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Oyun Adı:</Form.Label>
              <Form.Control type="text" placeholder="Poker" />
            </Form.Group>
          </Col>
        </Row>

        <Container className="d-flex justify-content-end">
          <Button type="submit" size="lg">
            Kaydet
          </Button>
        </Container>
      </Form>
    </Container>
  );
}

export default GameForm;
