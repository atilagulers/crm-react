import {Container, Form, Row, Col, Button} from 'react-bootstrap';
import React from 'react';
import Select from 'react-select';
import cities from '../../data/cities';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserPen} from '@fortawesome/free-solid-svg-icons';

function CustomerForm({
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
  users,
}) {
  const handleChangeCity = (selectedCity) => {
    const e = {target: {name: 'city', value: selectedCity.value}};
    handleChange(e);
  };

  return (
    <Container className="p-0 bg-light-dark " style={{margin: '0% auto'}}>
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
              <Form.Label>TC:</Form.Label>

              <Form.Control
                onChange={(e) => handleChange(e)}
                name="tc"
                type="text"
                placeholder="23360670014"
                value={formValues.tc.value}
                disabled={disabled}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>*Adı:</Form.Label>
              <Form.Control
                onChange={(e) => handleChange(e)}
                name="firstName"
                required
                type="text"
                placeholder="Atila"
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
              <Form.Label>*Soyadı:</Form.Label>

              <Form.Control
                onChange={(e) => handleChange(e)}
                name="lastName"
                required
                type="text"
                placeholder="Güler"
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
              <Form.Label>Telefon 1:</Form.Label>

              <Form.Control
                onChange={(e) => handleChange(e)}
                name="phone1"
                required
                type="text"
                placeholder="532xxxxxxx"
                isValid={formValues.phone1.isValid}
                isInvalid={!formValues.phone1.isValid}
                value={formValues.phone1.value}
                disabled={disabled}
              />
              <Form.Control.Feedback type="invalid">
                {formValues.phone1.validationMessage}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Telefon 2:</Form.Label>

              <Form.Control
                onChange={(e) => handleChange(e)}
                name="phone2"
                type="text"
                placeholder="532xxxxxxx"
                value={formValues.phone2.value}
                disabled={disabled}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Telefon 3:</Form.Label>

              <Form.Control
                onChange={(e) => handleChange(e)}
                name="phone3"
                type="text"
                placeholder="532xxxxxxx"
                value={formValues.phone3.value}
                disabled={disabled}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                onChange={(e) => handleChange(e)}
                name="email"
                type="email"
                placeholder="atila@example.com"
                value={formValues.email.value}
                disabled={disabled}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Doğum Tarihi:</Form.Label>
              <Form.Control
                onChange={(e) => handleChange(e)}
                name="birthday"
                type="date"
                value={formValues.birthday.value}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Adresi:</Form.Label>

              <Form.Control
                onChange={(e) => handleChange(e)}
                name="address"
                type="text"
                placeholder="3.cad. Kuzgun mah. 1332.sok 6/12"
                value={formValues.address.value}
                disabled={disabled}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>İş Adresi:</Form.Label>

              <Form.Control
                onChange={(e) => handleChange(e)}
                name="workAddress"
                type="text"
                placeholder="3.cad. Kuzgun mah. 1332.sok 6/12"
                value={formValues.workAddress.value}
                disabled={disabled}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Şehir:</Form.Label>
              <Select
                options={cities}
                styles={{
                  option: (provided, state) => ({
                    ...provided,
                    color: 'black',
                  }),
                }}
                onChange={(selectedOption) => handleChangeCity(selectedOption)}
                defaultValue={{
                  value: formValues.city.value,
                  label: formValues.city.value,
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Cinsiyeti:</Form.Label>
              <Form.Select
                onChange={(e) => handleChange(e)}
                name="gender"
                defaultValue={formValues.gender.value}
                aria-label="Default select example"
                disabled={disabled}
              >
                <option value="erkek">Erkek</option>
                <option value="kadin">Kadın</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>Agent:</Form.Label>
              <Form.Select
                onChange={(e) => handleChange(e)}
                name="user"
                defaultValue={formValues.user.value}
                aria-label="Default select example"
                disabled={disabled}
              >
                {users &&
                  users.map((user) => {
                    const fullName = `${user.firstName} ${user.lastName}`;
                    return (
                      <option value={user._id} key={user._id}>
                        {fullName}
                      </option>
                    );
                  })}
              </Form.Select>
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

export default CustomerForm;
