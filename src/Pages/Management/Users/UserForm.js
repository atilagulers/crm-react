import {Container, Form, Row, Col, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserPen} from '@fortawesome/free-solid-svg-icons';

function UserForm({
  title,
  handleSubmit,
  handleChange,
  formValues,
  isFormValid,
  isSaving,
  disabled = false,
  showPasswordInput = true,
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
        noValidate
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
              <Form.Label>Adı:</Form.Label>
              <Form.Control
                onChange={(e) => handleChange(e)}
                name={'firstName'}
                required
                type="text"
                placeholder={'Atila'}
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
                placeholder={'Güler'}
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
              <Form.Label>Kullanıcı Adı:</Form.Label>
              <Form.Control
                onChange={(e) => handleChange(e)}
                name="username"
                required
                type="text"
                placeholder="atilaguler"
                isValid={formValues.username.isValid}
                isInvalid={!formValues.username.isValid}
                value={formValues.username.value}
                disabled={disabled}
              />
              <Form.Control.Feedback type="invalid">
                {formValues.username.validationMessage}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col style={{display: showPasswordInput ? '' : 'none'}}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Kullanıcı Şifre:</Form.Label>

              <Form.Control
                onChange={(e) => handleChange(e)}
                name="password"
                required
                type="password"
                placeholder="Şifre"
                isValid={formValues.password.isValid}
                isInvalid={!formValues.password.isValid}
                value={formValues.password.value}
                disabled={disabled}
              />
              <Form.Control.Feedback type="invalid">
                {formValues.password.validationMessage}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Rol:</Form.Label>
              <Form.Select
                onChange={(e) => handleChange(e)}
                name="role"
                isValid={formValues.role.isValid}
                isInvalid={!formValues.role.isValid}
                defaultValue={formValues.role.value}
                aria-label="Default select example"
                disabled={disabled}
              >
                <option value="agent">Agent</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Container className="d-flex justify-content-end px-0">
          <Button
            style={{display: showSubmitButton ? '' : 'none'}}
            disabled={!isFormValid(formValues) || isSaving}
            type="submit"
            size="lg"
          >
            {submitButtonText}
          </Button>
        </Container>
      </Form>
    </Container>
  );
}

export default UserForm;
