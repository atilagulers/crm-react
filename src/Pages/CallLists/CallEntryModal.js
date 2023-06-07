import React, {useState, useEffect} from 'react';
import {Modal, Button, Form, FormGroup} from 'react-bootstrap';

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
          <Button onClick={() => props.setShow(false)}>Close</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer
        className="bg-light-dark"
        style={{border: '1px solid black'}}
      >
        <Button onClick={() => props.setShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CallEntryModal;
