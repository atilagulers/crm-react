import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserPen} from '@fortawesome/free-solid-svg-icons';

function AirlineForm({
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
  return (
    <Container className=" p-0 bg-light-dark mb-5" style={{margin: '0% auto'}}>
      <Container className="p-3 bg-primary d-flex justify-content-between">
        <h3>{title}</h3>
        <FontAwesomeIcon
          onClick={handleClickEdit}
          className="p-2"
          icon={faUserPen}
          size="2x"
          style={{cursor: 'pointer', display: showEditButton ? '' : 'none'}}
        />
      </Container>
      <Form
        className="p-5"
        noValidate
        //validated={validated}
        onSubmit={handleSubmit}
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
                disabled={disabled}
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
            style={{display: showSubmitButton ? '' : 'none'}}
            disabled={!isFormValid(formValues) || isSaving}
          >
            {submitButtonText}
          </Button>
        </Container>
      </Form>
    </Container>
  );
}

export default AirlineForm;
