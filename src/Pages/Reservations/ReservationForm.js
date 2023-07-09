import {Container, Form, Row, Col, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserPen} from '@fortawesome/free-solid-svg-icons';
import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {AppContext} from '../../Contexts/AppContext';

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
  const {state} = useContext(AppContext);
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [phone, setPhone] = useState();
  const handleChangeCustomer = (selectedCity) => {
    const e = {target: {name: 'city', value: selectedCity.value}};
    handleChange(e);
  };

  const fetchSelectedCustomer = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    };

    const {data} = await axios.get(
      `${process.env.REACT_APP_API}/customer?phone=${phone}&sortBy=firstName&sortOrder=-1`,
      config
    );

    setSelectedCustomer(data.customers[0]);
  };

  const handleSubmitPhone = (e) => {
    e.preventDefault();

    fetchSelectedCustomer();
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
        //controlId="exampleForm.ControlInput1"
        onSubmit={(e) => handleSubmitPhone(e)}
      >
        <Row className="d-flex justify-content-between">
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Müşteri Telefonu (Telefon 1-2 veya 3):</Form.Label>
              <Row>
                <Col className="col-4">
                  <Form.Control
                    onChange={(e) => setPhone(e.target.value)}
                    name="phone"
                    required
                    type="number"
                    placeholder={'532xxxxxxx'}
                    //isValid={formValues.hotel.isValid}
                    //isInvalid={!formValues.hotel.isValid}
                    //value={formValues.hotel.value}
                    disabled={disabled}
                  />
                </Col>
                <Col className="col-1">
                  <Button onClick={handleSubmitPhone}>Ara</Button>
                </Col>
              </Row>
              <Form.Control.Feedback type="invalid">
                {formValues.hotel.validationMessage}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </Form>

      {selectedCustomer && (
        <Form
          noValidate
          //validated={validated}
          className="p-5 pt-2"
          onSubmit={(e) => handleSubmit(e)}
        >
          <h3 className="mb-3">Müşteri Bilgileri</h3>
          <Row className="d-flex justify-content-between mb-4">
            <Col>
              <Form.Group
                className="mb-3 ms"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Müşteri:</Form.Label>
                <Form.Control
                  onChange={(e) => handleChange(e)}
                  //name="customerName"
                  required
                  type="text"
                  placeholder={'Müşteri Adı'}
                  value={`${selectedCustomer?.firstName} ${selectedCustomer?.lastName}`}
                  disabled={true}
                />
                <Form.Control.Feedback type="invalid">
                  {formValues.hotel.validationMessage}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3 ms"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Otel:</Form.Label>
                <Form.Control
                  onChange={(e) => handleChange(e)}
                  name="hotel"
                  required
                  type="text"
                  placeholder={'Savoy'}
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
          </Row>

          <h3 className="mb-3">Gidiş Bilgileri</h3>
          <Row className="d-flex justify-content-between mb-3">
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Havayolu:</Form.Label>
                <Form.Control
                  onChange={(e) => handleChange(e)}
                  name="departureAirline"
                  required
                  type="text"
                  placeholder={'THY'}
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
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Label>Tarih:</Form.Label>{' '}
                <Form.Control
                  onChange={(e) => handleChange(e)}
                  name="departureDate"
                  required
                  type="date"
                  placeholder="atilaguler"
                  isValid={formValues.departureDate.isValid}
                  isInvalid={!formValues.departureDate.isValid}
                  value={formValues.departureDate.value}
                  disabled={disabled}
                />
                <Form.Control.Feedback type="invalid">
                  {formValues.departureDate.validationMessage}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Saat:</Form.Label>
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
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Kalkış Yeri:</Form.Label>

                <Form.Control
                  onChange={(e) => handleChange(e)}
                  name="departureDestination"
                  required
                  type="departureDestination"
                  placeholder="Lefkoşa"
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
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>PNR:</Form.Label>

                <Form.Control
                  onChange={(e) => handleChange(e)}
                  name="text"
                  required
                  type="text"
                  placeholder="ABC123"
                  isValid={formValues.departurePNR.isValid}
                  isInvalid={!formValues.departurePNR.isValid}
                  value={formValues.departurePNR.value}
                  disabled={disabled}
                />
                <Form.Control.Feedback type="invalid">
                  {formValues.departurePNR.validationMessage}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <h3 className="mb-3">Dönüş Bilgileri</h3>
          <Row className="d-flex justify-content-between mb-3">
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Havayolu:</Form.Label>
                <Form.Control
                  onChange={(e) => handleChange(e)}
                  name="returnAirline"
                  required
                  type="text"
                  placeholder={'THY'}
                  isValid={formValues.returnAirline.isValid}
                  isInvalid={!formValues.returnAirline.isValid}
                  value={formValues.returnAirline.value}
                  disabled={disabled}
                />
                <Form.Control.Feedback type="invalid">
                  {formValues.returnAirline.validationMessage}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Label>Tarih:</Form.Label>{' '}
                <Form.Control
                  onChange={(e) => handleChange(e)}
                  name="returnDate"
                  required
                  type="date"
                  placeholder="atilaguler"
                  isValid={formValues.returnDate.isValid}
                  isInvalid={!formValues.returnDate.isValid}
                  value={formValues.returnDate.value}
                  disabled={disabled}
                />
                <Form.Control.Feedback type="invalid">
                  {formValues.returnDate.validationMessage}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Saat:</Form.Label>
                <Form.Control
                  onChange={(e) => handleChange(e)}
                  name="returnTime"
                  required
                  type="text"
                  placeholder="atilaguler"
                  isValid={formValues.returnTime.isValid}
                  isInvalid={!formValues.returnTime.isValid}
                  value={formValues.returnTime.value}
                  disabled={disabled}
                />
                <Form.Control.Feedback type="invalid">
                  {formValues.returnTime.validationMessage}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Dönüş Yeri:</Form.Label>

                <Form.Control
                  onChange={(e) => handleChange(e)}
                  name="returnDestination"
                  required
                  type="text"
                  placeholder="Ankara"
                  isValid={formValues.returnDestination.isValid}
                  isInvalid={!formValues.returnDestination.isValid}
                  value={formValues.returnDestination.value}
                  disabled={disabled}
                />
                <Form.Control.Feedback type="invalid">
                  {formValues.returnDestination.validationMessage}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>PNR:</Form.Label>

                <Form.Control
                  onChange={(e) => handleChange(e)}
                  name="returnPNR"
                  required
                  type="text"
                  placeholder="ABC123"
                  isValid={formValues.returnPNR.isValid}
                  isInvalid={!formValues.returnPNR.isValid}
                  value={formValues.returnPNR.value}
                  disabled={disabled}
                />
                <Form.Control.Feedback type="invalid">
                  {formValues.returnPNR.validationMessage}
                </Form.Control.Feedback>
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
      )}
    </Container>
  );
}

export default ReservationForm;
