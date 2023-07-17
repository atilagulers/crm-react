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
  phoneFormHidden = false,
}) {
  const {state} = useContext(AppContext);
  const [phone, setPhone] = useState('');
  const [hotels, setHotels] = useState(false);
  const [airlines, setAirlines] = useState(false);
  const {search} = useLocation();

  useEffect(() => {
    const customerPhone = search.split('=')[1];

    if (customerPhone) setPhone(customerPhone);
  }, [search]);

  const handleChangeCustomer = (selectedCustomer) => {
    const e = {target: {name: 'customer', value: selectedCustomer.value}};
    handleChange(e);
  };

  const handleChangeHotel = (selectedHotel) => {
    const e = {target: {name: 'hotel', value: selectedHotel.value}};
    handleChange(e);
  };

  const handleChangeDepartureAirline = (selectedAirline) => {
    const e = {
      target: {name: 'departureAirline', value: selectedAirline.value},
    };
    handleChange(e);
  };

  const handleChangeArrivalAirline = (selectedAirline) => {
    const e = {
      target: {
        name: 'arrivalAirline',
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

  const handleChangeArrivalTime = (time) => {
    const e = {
      target: {name: 'arrivalTime', value: time},
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
  }, [state.token, handleChange]);

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

        const arrivalAirlineEvent = {
          target: {
            name: 'arrivalAirline',
            value: data.airlines[0]._id,
          },
        };
        handleChange(arrivalAirlineEvent);

        setAirlines(airlineOptions);
      } catch (error) {}
    };
    fetchAirlines();

    return () => {
      source.cancel();
    };
  }, [state.token, handleChange]);

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

      if (data.customers[0].isReserved)
        return toast.error('Bu kullanıcının zaten aktif bir rezervasyonu var.');

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
      toast.error(`Müşteri bulunamadı.`);
    }
  };

  const handleSubmitPhone = (e) => {
    e.preventDefault();

    if (!phone)
      return toast.error('Lütfen geçerli bir telefon numarası giriniz.');

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
        hidden={phoneFormHidden}
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
                  defaultValue={
                    {
                      value: formValues.hotel.value,
                      label: formValues.hotel.name,
                    } && {
                      value: hotels[0].value,
                      label: hotels[0].label,
                    }
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <h3 className="mb-3">Kalkış Bilgileri</h3>
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
                  defaultValue={
                    {
                      value: formValues.departureAirline.value,
                      label: formValues.departureAirline.name,
                    } && {
                      value: airlines[0].value,
                      label: airlines[0].label,
                    }
                  }
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
                  max="9999-12-31"
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
                <Form.Label>*Kalkış Yeri:</Form.Label>

                <Form.Control
                  onChange={(e) => handleChange(e)}
                  name="departureDestination"
                  required
                  type="text"
                  placeholder="Ankara"
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

          <h3 className="mb-3">Varış Bilgileri</h3>
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
                    handleChangeArrivalAirline(selectedOption)
                  }
                  defaultValue={
                    {
                      value: formValues.arrivalAirline.value,
                      label: formValues.arrivalAirline.name,
                    } && {
                      value: airlines[0].value,
                      label: airlines[0].label,
                    }
                  }
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
                  name="arrivalDate"
                  required
                  type="date"
                  placeholder="atilaguler"
                  isValid={formValues.arrivalDate.isValid}
                  isInvalid={!formValues.arrivalDate.isValid}
                  value={formValues.arrivalDate.value}
                  disabled={disabled}
                  max="9999-12-31"
                />
                <Form.Control.Feedback type="invalid">
                  {formValues.arrivalDate.validationMessage}
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
                  onChange={handleChangeArrivalTime}
                  value={formValues.arrivalTime.value}
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
                <Form.Label>*Varış Yeri:</Form.Label>

                <Form.Control
                  onChange={(e) => handleChange(e)}
                  name="arrivalDestination"
                  required
                  type="text"
                  placeholder="Lefkoşa"
                  isValid={formValues.arrivalDestination.isValid}
                  isInvalid={!formValues.arrivalDestination.isValid}
                  value={formValues.arrivalDestination.value}
                  disabled={disabled}
                />
                <Form.Control.Feedback type="invalid">
                  {formValues.arrivalDestination.validationMessage}
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
                  name="arrivalPNR"
                  required
                  type="text"
                  placeholder="ABC123"
                  isValid={formValues.arrivalPNR.isValid}
                  isInvalid={!formValues.arrivalPNR.isValid}
                  value={formValues.arrivalPNR.value}
                  disabled={disabled}
                />
                <Form.Control.Feedback type="invalid">
                  {formValues.arrivalPNR.validationMessage}
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
