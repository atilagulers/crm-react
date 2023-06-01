import React, {useEffect} from 'react';
import PageWrapper from '../../Components/PageWrapper';
import {Form, Button, Container, Row, Col, Table} from 'react-bootstrap';

function Users() {
  return (
    <PageWrapper title={'Users | Management'}>
      <Container
        className="rounded-2 p-0 bg-light-dark "
        style={{margin: '2% auto', width: '90%'}}
      >
        <Container className="rounded-top-2 p-3 bg-primary p-0 m-0">
          <h3>Kullanıcı ekle</h3>
        </Container>
        <Form className="p-5">
          <Row className="d-flex justify-content-between">
            <Col>
              <Form.Group
                className="mb-3 ms"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Ad:</Form.Label>
                <Form.Control type="text" placeholder="Atila" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Soyad:</Form.Label>
                <Form.Control type="text" placeholder="Güler" />
              </Form.Group>
            </Col>
          </Row>
          <Row className="d-flex justify-content-between mb-3">
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Kullanıcı Ad:</Form.Label>
                <Form.Control type="text" placeholder="atila@example.com" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Kullanıcı Şifre:</Form.Label>
                <Form.Control type="password" placeholder="Şifre" />
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
      <Container>
        {' '}
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </PageWrapper>
  );
}

export default Users;
