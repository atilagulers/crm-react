import {Container, Form, Row, Col, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserPen} from '@fortawesome/free-solid-svg-icons';
import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {AppContext} from '../../Contexts/AppContext';
import {toast} from 'react-toastify';
import Select from 'react-select';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import LoadingSpinner from '../../Components/LoadingSpinner';
import {useLocation} from 'react-router-dom';

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
  selectedCustomer,
  setSelectedCustomer,
}) {
  const {state} = useContext(AppContext);
  const [phone, setPhone] = useState();
  const [hotels, setHotels] = useState(false);
  const [airlines, setAirlines] = useState(false);
  const {search} = useLocation();

  useEffect(() => {
    const customerPhone = search.split('=')[1];

    if (customerPhone) setPhone(customerPhone);
  }, []);

  const handleChangeCustomer = (selectedCustomer) => {
    const e = {target: {name: 'customer', value: selectedCustomer.value}};
    handleChange(e);
  };

  const handleChangeHotel = (selectedHotel) => {
    const e = {target: {name: 'hotel', value: selectedHotel.value}};
    handleChange(e);
    console.log(formValues);
  };

  const handleChangeDepartureAirline = (selectedAirline) => {
    const e = {
      target: {name: 'departureAirline', value: selectedAirline.value},
    };
    handleChange(e);
  };

  const handleChangeReturnAirline = (selectedAirline) => {
    const e = {
      target: {
        name: 'returnAirline',
        value: selectedAirline.value,
      },
    };
    handleChange(e);
  };

  const handleChangeDepartureTime = (time) => {
    const e = {
      target: {name: 'departureTime', value: time},
    };
    handleChange(e);
  };

  const handleChangeReturnTime = (time) => {
    const e = {
      target: {name: 'returnTime', value: time},
    };
    handleChange(e);
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchHotels = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
          cancelToken: source.token,
        };

        const {data} = await axios.get(
          `${process.env.REACT_APP_API}/hotel?page=1&limit=9999`,
          config
        );
        const hotelOptions = data.hotels.map((hotel) => ({
          value: hotel._id,
          label: hotel.name,
        }));

        const hotelEvent = {
          target: {name: 'hotel', value: data.hotels[0]._id},
        };
        handleChange(hotelEvent);

        setHotels(hotelOptions);
      } catch (error) {}
    };
    fetchHotels();

    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchAirlines = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
          cancelToken: source.token,
        };

        const {data} = await axios.get(
          `${process.env.REACT_APP_API}/airline?page=1&limit=9999`,
          config
        );
        const airlineOptions = data.airlines.map((airline) => ({
          value: airline._id,
          label: airline.name,
        }));

        const departureAirlineEvent = {
          target: {name: 'departureAirline', value: data.airlines[0]._id},
        };
        handleChange(departureAirlineEvent);

        const returnAirlineEvent = {
          target: {
            name: 'returnAirline',
            value: data.airlines[0]._id,
          },
        };
        handleChange(returnAirlineEvent);

        setAirlines(airlineOptions);
      } catch (error) {}
    };
    fetchAirlines();

    return () => {
      source.cancel();
    };
  }, []);

  const fetchSelectedCustomer = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      };

      const {data} = await axios.get(
        `${process.env.REACT_APP_API}/customer?phone=${phone}&sortBy=firstName&sortOrder=-1`,
        config
      );

      const customerEvent = {
        target: {name: 'customer', value: data.customers[0]._id},
      };
      handleChange(customerEvent);

      const userEvent = {
        target: {name: 'user', value: data.customers[0].user[0]._id},
      };

      handleChange(userEvent);

      setSelectedCustomer(data.customers[0]);
    } catch (error) {
      toast.error(`Müşteri bulunamadı. ${error}`);
    }
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
              <Form.Label>*Müşteri Telefonu (Telefon 1-2 veya 3):</Form.Label>
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
                    value={phone}
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
      {selectedCustomer && airlines && hotels && (
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
                  name="customer"
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
                <Form.Label>Agent:</Form.Label>
                <Form.Control
                  onChange={(selectedOption) =>
                    handleChangeCustomer(selectedOption)
                  }
                  name="user"
                  required
                  type="text"
                  placeholder={'Agent Adı'}
                  value={`${selectedCustomer?.user[0].firstName} ${selectedCustomer?.user[0].lastName}`}
                  disabled={true}
                />
                <Form.Control.Feedback type="invalid">
                  {formValues.hotel.validationMessage}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>*Otel:</Form.Label>
                <Select
                  isDisabled={disabled}
                  options={hotels}
                  styles={{
                    option: (provided, state) => ({
                      ...provided,
                      color: 'black',
                    }),
                  }}
                  onChange={(selectedOption) =>
                    handleChangeHotel(selectedOption)
                  }
                  defaultValue={{
                    value: hotels[0].value,
                    label: hotels[0].label,
                  }}
                />
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
                <Form.Label>*Havayolu:</Form.Label>
                <Select
                  isDisabled={disabled}
                  options={airlines}
                  styles={{
                    option: (provided, state) => ({
                      ...provided,
                      color: 'black',
                    }),
                  }}
                  onChange={(selectedOption) =>
                    handleChangeDepartureAirline(selectedOption)
                  }
                  defaultValue={{
                    value: airlines[0].value,
                    label: airlines[0].label,
                  }}
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Label>*Tarih:</Form.Label>{' '}
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
                  max="2023-12-31"
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
                <Form.Label>*Saat:</Form.Label>
                <TimePicker
                  onChange={handleChangeDepartureTime}
                  value={formValues.departureTime.value}
                  format="HH:mm"
                  clearIcon={null}
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>*Gidiş Yeri:</Form.Label>

                <Form.Control
                  onChange={(e) => handleChange(e)}
                  name="departureDestination"
                  required
                  type="text"
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
                <Form.Label>*PNR:</Form.Label>

                <Form.Control
                  onChange={(e) => handleChange(e)}
                  name="departurePNR"
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
                <Form.Label>*Havayolu:</Form.Label>
                <Select
                  isDisabled={disabled}
                  options={airlines}
                  styles={{
                    option: (provided, state) => ({
                      ...provided,
                      color: 'black',
                    }),
                  }}
                  onChange={(selectedOption) =>
                    handleChangeReturnAirline(selectedOption)
                  }
                  defaultValue={{
                    value: airlines[0].value,
                    label: airlines[0].label,
                  }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Label>*Tarih:</Form.Label>{' '}
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
                  max="2023-12-31"
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
                <Form.Label>*Saat:</Form.Label>
                <TimePicker
                  onChange={handleChangeReturnTime}
                  value={formValues.returnTime.value}
                  format="HH:mm"
                  clearIcon={null}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>*Dönüş Yeri:</Form.Label>

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
                controlId="exampleForm.ControlInput3"
              >
                <Form.Label>*PNR:</Form.Label>

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
