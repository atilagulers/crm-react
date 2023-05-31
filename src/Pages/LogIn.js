import React from 'react';
import PageWrapper from '../Components/PageWrapper';
import {Form, Button, Col, Image, Container} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

function LogIn() {
  const navigate = useNavigate();

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <PageWrapper title="Login">
      <Col
        lg={4}
        md={6}
        sm={8}
        className="d-flex justify-content-center"
        style={{margin: '0% auto'}}
      >
        <Form
          className="shadow rounded-3 p-5 bg-light-dark"
          style={{width: '100%'}}
          onSubmit={handleSubmitLogin}
        >
          <Container className="d-flex justify-content-center mb-5">
            <Image src="/images/logo.png" style={{width: '256px'}} />
          </Container>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              //onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              //onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Col className="d-grid">
            <Button variant="primary" className="mb-3" type="submit">
              Log In
            </Button>
          </Col>
          <Form.Group
            className="d-flex justify-content-between"
            controlId="formBasicCheckbox"
          >
            <Form.Check type="checkbox" label="Remember me" />
            <Button variant="link" className="p-0">
              Forgot Password?
            </Button>
          </Form.Group>
        </Form>
      </Col>
    </PageWrapper>
  );
}

export default LogIn;
