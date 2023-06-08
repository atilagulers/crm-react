import React, {useState, useEffect} from 'react';
import {
  Modal,
  Button,
  Form,
  FormGroup,
  Container,
  Table,
} from 'react-bootstrap';

function CallEntryModal(props) {
  const [isComing, setIsComing] = useState(false);
  const [willBeCalled, setWillBeCalled] = useState(false);

  const handleChangeWillBeCalled = (e) => {
    setIsComing(e.target.checked);
  };
  const handleChangeIsComing = (e) => {
    setWillBeCalled(e.target.checked);
  };
  return (
    <Modal
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => props.setShow(false)}
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
        <h4>Atila Güler - 0536 872 78 03</h4>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Açıklama</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="isComingCheckbox">
            <Form.Check
              onChange={handleChangeWillBeCalled}
              type="checkbox"
              label="Tekrar Aranacak"
            />
          </Form.Group>
          <FormGroup className="mb-3" controlId="willBeCalledCheckbox">
            <Form.Check
              onChange={handleChangeIsComing}
              type="checkbox"
              label="Geliyor"
            />
          </FormGroup>
          <Container className="d-flex justify-content-end gap-4 px-0">
            <Button variant="secondary" onClick={() => props.setShow(false)}>
              İptal
            </Button>
            <Button>Kaydet</Button>
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
              <th>Arayan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Footer>
    </Modal>
  );
}

export default CallEntryModal;
