import React, {useState, useEffect, useContext} from 'react';
import {
  Modal,
  Button,
  Form,
  FormGroup,
  Container,
  Table,
} from 'react-bootstrap';
import axios from 'axios';
import {AppContext} from '../../Contexts/AppContext';
import {toast} from 'react-toastify';
import {formatDate} from '../../Helpers';
import LoadingSpinner from '../../Components/LoadingSpinner';

function CallEntryModal({show, setShow, customer}) {
  const {state} = useContext(AppContext);
  const user = state.user;
  const [log, setLog] = useState('');
  const [willBeCalled, setWillBeCalled] = useState(false);
  const [waitingReservation, setIsWaitingReservation] = useState(false);
  const [callDate, setCallDate] = useState();
  const [calls, setCalls] = useState([]);
  const [isFetchingCalls, setIsFetchingCalls] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchCalls = async () => {
      setIsFetchingCalls(true);
      try {
        const {data} = await axios.get(
          `${process.env.REACT_APP_API}/call?&sortBy=createdAt&sortOrder=-1&customerId=${customer._id}`,
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
            cancelToken: source.token,
          }
        );
        setCalls(data.calls);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetchingCalls(false);
      }
    };
    fetchCalls();

    return () => {
      source.cancel();
    };
  }, [show]);

  const createCall = async () => {
    try {
      const body = {
        customer: customer._id,
        user: user._id,
        log,
      };

      const {data} = await axios.post(
        `${process.env.REACT_APP_API}/call`,
        body,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      toast.success(`Arama oluşturuldu.`);
      return data;
    } catch (error) {
      toast.error(`Arama oluşturulamadı. ${error}`);
    }
  };

  const updateCustomer = async () => {
    try {
      const body = {
        waitingReservation,
        willBeCalled,
        callDate,
      };

      axios.patch(
        `${process.env.REACT_APP_API}/customer/${customer._id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      toast.success(`Müşteri güncellendi.`);
    } catch (error) {
      toast.error(`Müşteri güncellenemedi. ${error}`);
      console.log(error);
    }
  };

  const handleClickSubmit = async () => {
    if (willBeCalled && !callDate)
      return toast.error('Lütfen geçerli bir tarih giriniz.');

    await createCall();
    await updateCustomer();
    setShow(false);
    window.location.reload();
  };

  const handleChangeWaitingReservation = (e) => {
    if (customer.isReserved) {
      e.preventDefault();
      toast.error('Bu kullanıcının zaten rezervasyonu var.');
    } else if (customer.waitingReservation) {
      e.preventDefault();
      toast.error('Bu kullanıcının zaten rezervasyonu var.');
    } else {
      setIsWaitingReservation(!customer.isReserved);
    }
  };

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
      onHide={() => setShow(false)}
    >
      <Modal.Header
        closeButton
        className="bg-light-dark"
        style={{border: '1px solid black'}}
      >
        <Modal.Title id="contained-modal-title-vcenter">
          Arama Giriş Formu
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light-dark" style={{border: '1px solid black'}}>
        <h4>
          {`${customer?.firstName} ${customer?.lastName} - ${customer?.phone1}`}
          {customer?.phone2 && ` - ${customer?.phone2}`}
          {customer?.phone3 && ` - ${customer?.phone3}`}
        </h4>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Açıklama</Form.Label>
            <Form.Control
              onChange={(e) => setLog(e.target.value)}
              as="textarea"
              rows={3}
            />
          </Form.Group>
          <Form.Group
            className="mb-3 d-flex align-items-center"
            controlId="willBeCalledCheckbox"
          >
            <Form.Check
              onChange={(e) => setWillBeCalled(e.target.checked)}
              type="checkbox"
              label="Tekrar Aranacak"
            />

            <Form.Control
              onChange={(e) => setCallDate(e.target.value)}
              type="date"
              label="Tekrar Aranacak"
              className="ms-3"
              style={{maxWidth: '300px', display: willBeCalled ? '' : 'none'}}
            />
          </Form.Group>
          <FormGroup className="mb-3" controlId="isReservedCheckbox">
            <Form.Check
              onChange={(e) => handleChangeWaitingReservation(e)}
              type="checkbox"
              label={
                customer.isReserved || customer.waitingReservation
                  ? 'Müşterinin zaten rezervasyonu var ya da bekleme listesinde..'
                  : 'Rezervasyon Bekleme Listesine Ekle'
              }
              disabled={customer.isReserved || customer.waitingReservation}
            />
          </FormGroup>
          <Container className="d-flex justify-content-end gap-4 px-0">
            <Button variant="secondary" onClick={() => setShow(false)}>
              İptal
            </Button>
            <Button onClick={handleClickSubmit}>Kaydet</Button>
          </Container>
        </Form>
      </Modal.Body>
      <Modal.Footer
        className="bg-light-dark justify-content-start"
        style={{border: '1px solid black'}}
      >
        <h3 className="p-2">Arama Geçmişi</h3>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Tarih</th>
              <th>Açıklama</th>
              <th>Agent</th>
            </tr>
          </thead>
          <tbody>
            {calls.length > 0 &&
              calls?.map((call) => {
                return (
                  <tr key={call._id}>
                    <td>{formatDate(call.createdAt)}</td>
                    <td>{call.log}</td>
                    <td>{`${call.user[0]?.firstName} ${call.user[0]?.lastName}`}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Modal.Footer>
    </Modal>
  );
}

export default CallEntryModal;
