import {Container, Form, Row, Col, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserPen} from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';

function ReservationForm({
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
  const cities = [
    {label: 'Antalya', value: 'antalya'},
    {label: 'Ardahan', value: 'ardahan'},
    {label: 'Artvin', value: 'artvin'},
    {label: 'Aydın', value: 'aydin'},
  ];

  const handleChangeCustomer = (selectedCity) => {
    const e = {target: {name: 'city', value: selectedCity.value}};
    handleChange(e);
  };

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
                name="hotel"
                required
                type="text"
                placeholder={'Atila'}
                isValid={formValues.hotel.isValid}
                isInvalid={!formValues.hotel.isValid}
                value={formValues.hotel.value}
                disabled={disabled}
              />
              <Form.Control.Feedback type="invalid">
                {formValues.hotel.validationMessage}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Soyadı:</Form.Label>
              <Form.Control
                onChange={(e) => handleChange(e)}
                name="departureAirline"
                required
                type="text"
                placeholder={'Güler'}
                isValid={formValues.departureAirline.isValid}
                isInvalid={!formValues.departureAirline.isValid}
                value={formValues.departureAirline.value}
                disabled={disabled}
              />
              <Form.Control.Feedback type="invalid">
                {formValues.departureAirline.validationMessage}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="d-flex justify-content-between mb-3">
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Müşteri Telefonu (Telefon 1-2 veya 3):</Form.Label>{' '}
              <Form.Control
                onChange={(e) => handleChange(e)}
                name="customerNumber"
                required
                type="number"
                placeholder="atilaguler"
                isValid={formValues.customerNumber.isValid}
                isInvalid={!formValues.customerNumber.isValid}
                value={formValues.customerNumber.value}
                disabled={disabled}
              />
              <Form.Control.Feedback type="invalid">
                {formValues.customerNumber.validationMessage}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Kullanıcı Adı:</Form.Label>
              <Form.Control
                onChange={(e) => handleChange(e)}
                name="departureTime"
                required
                type="text"
                placeholder="atilaguler"
                isValid={formValues.departureTime.isValid}
                isInvalid={!formValues.departureTime.isValid}
                value={formValues.departureTime.value}
                disabled={disabled}
              />
              <Form.Control.Feedback type="invalid">
                {formValues.departureTime.validationMessage}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col style={{display: showPasswordInput ? '' : 'none'}}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Kullanıcı Şifre:</Form.Label>

              <Form.Control
                onChange={(e) => handleChange(e)}
                name="departureDestination"
                required
                type="departureDestination"
                placeholder="Şifre"
                isValid={formValues.departureDestination.isValid}
                isInvalid={!formValues.departureDestination.isValid}
                value={formValues.departureDestination.value}
                disabled={disabled}
              />
              <Form.Control.Feedback type="invalid">
                {formValues.departureDestination.validationMessage}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Rol:</Form.Label>
              <Form.Select
                onChange={(e) => handleChange(e)}
                name="departurePNR"
                isValid={formValues.departurePNR.isValid}
                isInvalid={!formValues.departurePNR.isValid}
                defaultValue={formValues.departurePNR.value}
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

export default ReservationForm;
