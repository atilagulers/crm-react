import React, {useEffect} from 'react';
import {Form, Button, Container, Row, Col} from 'react-bootstrap';

function HotelsCreate() {
  return (
    <Container className=" p-0 bg-light-dark mb-5" style={{margin: '0% auto'}}>
      <Container className="p-3 bg-primary">
        <h3>Otel ekle</h3>
      </Container>
      <Form className="p-5">
        <Row className="d-flex justify-content-between">
          <Col>
            <Form.Group
              className="mb-3 ms"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Otel Adı:</Form.Label>
              <Form.Control type="text" placeholder="Cratos" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Yetkili Kişi:</Form.Label>
              <Form.Control type="text" placeholder="Atila Güler" />
            </Form.Group>
          </Col>
        </Row>
        <Row className="d-flex justify-content-between mb-3">
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Telefon:</Form.Label>
              <Form.Control type="text" placeholder="532xxxxxxx" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" placeholder="atila@example.com" />
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

export default HotelsCreate;