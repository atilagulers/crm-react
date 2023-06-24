import React, {useEffect} from 'react';
import {Form, Button, Container, Row, Col} from 'react-bootstrap';

function AirlineForm({
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
        className="p-5"
        noValidate
        //validated={validated}
        onSubmit={handleSubmitCreate}
      >
        <Row className="d-flex justify-content-between">
          <Col>
            <Form.Group
              className="mb-3 ms"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Havayolu Adı:</Form.Label>
              <Form.Control
                onChange={(e) => handleChange(e)}
                name="name"
                required
                type="text"
                placeholder="Turkish Airlines"
                isValid={formValues.name.isValid}
                isInvalid={!formValues.name.isValid}
                value={formValues.name.value}
              />
              <Form.Control.Feedback type="invalid">
                {formValues.name.validationMessage}
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

export default AirlineForm;
