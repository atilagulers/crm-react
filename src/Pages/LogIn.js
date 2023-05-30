import React, {useEffect} from 'react';
import PageWrapper from '../Components/PageWrapper';
import {Container, Form, Button, Row, Col} from 'react-bootstrap';

function LogIn() {
  return (
    <PageWrapper title="Login">
      <Col
        lg={4}
        md={6}
        sm={8}
        className="d-flex justify-content-center mx-auto"
      >
        <Form style={{width: '100%'}}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-light">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              //onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="text-light">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              //onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Check me out"
              className="text-light"
            />
          </Form.Group>
          <Col className="d-grid">
            <Button variant="primary" type="submit">
              Log In
            </Button>
          </Col>
        </Form>
      </Col>
    </PageWrapper>
  );
}

export default LogIn;
