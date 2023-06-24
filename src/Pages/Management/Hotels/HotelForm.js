import React, {useEffect} from 'react';
import {Form, Button, Container, Row, Col} from 'react-bootstrap';

function HotelForm({
  title,
  handleSubmitCreate,
  handleChange,
  formValues,
  isFormValid,
  isCreating,
}) {
  return (
    <Container className=" p-0 bg-light-dark mb-5" style={{margin: '0% auto'}}>
      <Container className="p-3 bg-primary">
        <h3>{title}</h3>
      </Container>
      <Form
        noValidate
        //validated={validated}
        className="p-5"
        onSubmit={handleSubmitCreate}
      >
        <Row className="d-flex justify-content-between">
          <Col>
            <Form.Group
              className="mb-3 ms"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Otel Adı:</Form.Label>
              <Form.Control
                onChange={(e) => handleChange(e)}
                name="name"
                required
                type="text"
                placeholder="Cratos"
                isValid={formValues.name.isValid}
                isInvalid={!formValues.name.isValid}
                value={formValues.name.value}
              />
              <Form.Control.Feedback type="invalid">
                {formValues.name.validationMessage}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Yetkili Kişi:</Form.Label>
              <Form.Control
                onChange={(e) => handleChange(e)}
                name="responsible"
                required
                type="text"
                placeholder="Atila Güler"
                isValid={formValues.responsible.isValid}
                isInvalid={!formValues.responsible.isValid}
                value={formValues.responsible.value}
              />
              <Form.Control.Feedback type="invalid">
                {formValues.responsible.validationMessage}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="d-flex justify-content-between mb-3">
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Telefon:</Form.Label>
              <Form.Control
                onChange={(e) => handleChange(e)}
                name="phone"
                required
                type="text"
                placeholder="532xxxxxxx"
                isValid={formValues.phone.isValid}
                isInvalid={!formValues.phone.isValid}
                value={formValues.phone.value}
              />
              <Form.Control.Feedback type="invalid">
                {formValues.phone.validationMessage}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                onChange={(e) => handleChange(e)}
                name="email"
                required
                type="email"
                placeholder="atila@example.com"
                isValid={formValues.email.isValid}
                isInvalid={!formValues.email.isValid}
                value={formValues.email.value}
              />
              <Form.Control.Feedback type="invalid">
                {formValues.email.validationMessage}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Container className="d-flex justify-content-end px-0">
          <Button
            type="submit"
            size="lg"
            disabled={!isFormValid() || isCreating}
          >
            Kaydet
          </Button>
        </Container>
      </Form>
    </Container>
  );
}

export default HotelForm;
