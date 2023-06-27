import {Container, Form, Row, Col, Button} from 'react-bootstrap';
//import {useNavigate} from 'react-router-dom';

function CustomerForm({
  title,
  handleSubmit,
  handleChange,
  formValues,
  isFormValid,
  isSaving,
  disabled = false,
  showSubmitButton = true,
  handleClickEdit,
  showEditButton = false,
  submitButtonText = 'Kaydet',
}) {
  //const navigate = useNavigate();

  return (
    <Container className="p-0 bg-light-dark " style={{margin: '0% auto'}}>
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
              <Form.Label>TC:</Form.Label>
              <Form.Control
                onChange={(e) => handleChange(e)}
                name="tc"
                required
                type="text"
                placeholder="Cratos"
                isValid={formValues.tc.isValid}
                isInvalid={!formValues.tc.isValid}
                value={formValues.tc.value}
                disabled={disabled}
              />
              <Form.Control.Feedback type="invalid">
                {formValues.tc.validationMessage}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Adı:</Form.Label>
              <Form.Control
                onChange={(e) => handleChange(e)}
                name="firstName"
                required
                type="text"
                placeholder="Atila"
                isValid={formValues.firstName.isValid}
                isInvalid={!formValues.firstName.isValid}
                value={formValues.firstName.value}
                disabled={disabled}
              />
              <Form.Control.Feedback type="invalid">
                {formValues.firstName.validationMessage}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Soyadı:</Form.Label>

              <Form.Control
                onChange={(e) => handleChange(e)}
                name="lastName"
                required
                type="text"
                placeholder="Güler"
                isValid={formValues.lastName.isValid}
                isInvalid={!formValues.lastName.isValid}
                value={formValues.lastName.value}
                disabled={disabled}
              />
              <Form.Control.Feedback type="invalid">
                {formValues.lastName.validationMessage}
              </Form.Control.Feedback>
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
        <Container className="d-flex justify-content-end px-0">
          <Button type="submit" size="lg">
            Kaydet
          </Button>
        </Container>
      </Form>
    </Container>
  );
}

export default CustomerForm;
