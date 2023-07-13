import {Container, Form, Row, Col, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserPen} from '@fortawesome/free-solid-svg-icons';

function CustomerGroupForm({
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
    <Container className=" p-0 bg-light-dark " style={{margin: '0% auto'}}>
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
        //noValidate
        //validated={validated}
        className="p-5"
        onSubmit={(e) => handleSubmit(e)}
      >
        <Row className="d-flex justify-content-between">
          <Col>
            <Form.Group
              className="mb-3 ms"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>*Müşteri Grubu Adı:</Form.Label>
              <Form.Control
                onChange={(e) => handleChange(e)}
                name="name"
                defaultValue={formValues.name}
                type="text"
                placeholder="Yetişkin"
                disabled={disabled}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>*Açıklama:</Form.Label>
              <Form.Control
                onChange={(e) => handleChange(e)}
                name="explanation"
                defaultValue={formValues.explanation}
                type="text"
                placeholder="Bu grup 18 yaş üstü"
                disabled={disabled}
              />
            </Form.Group>
          </Col>
        </Row>

        <Container className="d-flex justify-content-end px-0">
          <Button
            type="submit"
            size="lg"
            style={{display: showSubmitButton ? '' : 'none'}}
            disabled={isSaving}
          >
            {submitButtonText}
          </Button>
        </Container>
      </Form>
    </Container>
  );
}

export default CustomerGroupForm;
