import {useState, useContext} from 'react';
import {Container, Form, Row, Col, Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {AppContext} from '../../../Contexts/AppContext';
import {toast} from 'react-toastify';

function UserForm({title, user}) {
  const {state} = useContext(AppContext);
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const [validated, setValidated] = useState(false);
  const validationMessages = {
    firstName: 'Ad 3 ile 20 karakter arasında olmalıdır.',
    lastName: 'Soyad 3 ile 20 karakter arasında olmalıdır.',
    username: 'Kullanıcı Adı 3 ile 20 karakter arasında olmalıdır.',
    password: 'Şifre en az 8 karakter arasında olmalıdır.',
  };

  const [formValues, setFormValues] = useState({
    firstName: {
      value: '',
      isValid: false,
      validationMessage: validationMessages.firstName,
    },
    lastName: {
      value: '',
      isValid: false,
      validationMessage: validationMessages.lastName,
    },
    username: {
      value: '',
      isValid: false,
      validationMessage: validationMessages.username,
    },
    password: {
      value: '',
      isValid: false,
      validationMessage: validationMessages.password,
    },
    role: {
      value: 'agent',
      isValid: true,
      validationMessage: '',
    },
  });

  const handleChange = (e) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: {
        value: e.target.value,
        isValid: getIsValid(e.target.name, e.target.value),
        validationMessage: getValidationMessage(e.target.name, e.target.value),
      },
    }));
  };

  const getIsValid = (field, value) => {
    if (field === 'firstName' || field === 'lastName' || field === 'username')
      return value.length >= 3 && value.length <= 20;

    if (field === 'password') return value.length >= 8;

    if (field === 'role') return true;
  };

  const getValidationMessage = (field, value = '') => {
    if (field === 'firstName' && !formValues[field].isValid) {
      return validationMessages.firstName;
    }
    if (field === 'lastName' && !formValues[field].isValid) {
      return validationMessages.lastName;
    }
    if (field === 'username' && !formValues[field].isValid) {
      return validationMessages.usernamee;
    }
    if (field === 'password' && !formValues[field].isValid) {
      return validationMessages.password;
    }

    return '';
  };

  const validateForm = () => {
    const isFormValid = Object.values(formValues).every(
      (field) => field.isValid
    );

    return isFormValid;
  };

  const createUser = async () => {
    try {
      setIsCreating(true);
      console.log(state.token);
      const body = {
        firstName: formValues.firstName.value,
        lastName: formValues.lastName.value,
        username: formValues.username.value,
        password: formValues.password.value,
        role: formValues.role.value,
      };
      console.log(body);
      const config = {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      };

      const newUser = await axios.post(
        `${process.env.REACT_APP_API}/user`,
        body,
        config
      );
      console.log(newUser);
      toast.success(`${newUser.firstName} Kullanıcısı başarıyla oluşturuldu.`);
    } catch (error) {
      if (error.response.status === 409) {
        toast.error('Bu kullanıcı adı zaten kullanılıyor.');
      } else {
        toast.error('Kullanıcı oluşturulamadı.');
      }
    } finally {
      setIsCreating(false);
    }
  };

  const handleSubmitCreate = async (e) => {
    e.preventDefault();

    setValidated(true);
    if (!validateForm()) return;
    setValidated(true);

    await createUser();
  };

  return (
    <Container className=" p-0 bg-light-dark " style={{margin: '0% auto'}}>
      <Container className="p-3 bg-primary">
        <h3>{title}</h3>
      </Container>
      <Form
        noValidate
        validated={validated}
        className="p-5"
        onSubmit={handleSubmitCreate}
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
                name="firstName"
                required
                type="text"
                placeholder="Atila"
                isValid={formValues.firstName.isValid}
                isInvalid={!formValues.firstName.isValid}
                value={formValues.firstName.value}
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
                placeholder="Güler"
                isValid={formValues.lastName.isValid}
                isInvalid={!formValues.lastName.isValid}
                value={formValues.lastName.value}
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
              />
              <Form.Control.Feedback type="invalid">
                {formValues.username.validationMessage}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Kullanıcı Şifre:</Form.Label>
              <Form.Control
                onChange={(e) => handleChange(e)}
                name="password"
                required
                type="password"
                placeholder="Şifre (en az 8 karakter)"
                isValid={formValues.password.isValid}
                isInvalid={!formValues.password.isValid}
                value={formValues.password.value}
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
              >
                <option value="agent">Agent</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Container className="d-flex justify-content-end px-0">
          <Button disabled={!validateForm()} type="submit" size="lg">
            Kaydet
          </Button>
        </Container>
      </Form>
    </Container>
  );
}

export default UserForm;
