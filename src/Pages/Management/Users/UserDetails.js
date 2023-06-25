import React, {useContext, useEffect, useState} from 'react';
import PageWrapper from '../../../Components/PageWrapper';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {AppContext} from '../../../Contexts/AppContext';
import './Style/Users.css';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import UserForm from './UserForm';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';

import {
  validationMessages,
  getIsValid,
  getValidationMessage,
  isFormValid,
} from './UserValidation';

function UserDetails() {
  const {state} = useContext(AppContext);
  const navigate = useNavigate();
  const {id: userId} = useParams();
  const [user, setUser] = useState();
  const [isFormDisabled, setIsFormDisabled] = useState(true);

  const initialFormValues = {
    firstName: {
      value: user ? user.firstName : '',
      isValid: true,
      validationMessage: validationMessages.firstName,
    },
    lastName: {
      value: user ? user.lastName : '',
      isValid: true,
      validationMessage: validationMessages.lastName,
    },
    username: {
      value: user ? user.username : '',
      isValid: true,
      validationMessage: validationMessages.username,
    },
    password: {
      value: user ? user.password : '',
      isValid: true,
      validationMessage: validationMessages.password,
    },
    role: {
      value: 'agent',
      isValid: true,
      validationMessage: '',
    },
  };
  const [formValues, setFormValues] = useState(initialFormValues);

  //const handleChangeInput = (e) => {
  //  setFormValues((prevValues) => ({
  //    ...prevValues,
  //    [e.target.name]: {
  //      value: e.target.value,
  //      isValid: getIsValid(e.target.name, e.target.value),
  //      validationMessage: getValidationMessage(
  //        e.target.name,
  //        e.target.value,
  //        formValues
  //      ),
  //    },
  //    password: {
  //      ...prevValues.password,
  //      isValid: true,
  //    },
  //  }));
  //};

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchUser = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      };

      const {data} = await axios.get(
        `${process.env.REACT_APP_API}/user/${userId}`,
        config
      );

      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        firstName: {
          ...prevFormValues.firstName,
          value: data.firstName || '',
          isValid: true,
        },
        lastName: {
          ...prevFormValues.lastName,
          value: data.lastName || '',
          isValid: true,
        },
        username: {
          ...prevFormValues.username,
          value: data.username || '',
          isValid: true,
        },
      }));

      setUser(data);
    };
    fetchUser();

    return () => {
      source.cancel();
    };
  }, []);

  const handleClickEdit = () => {
    navigate('edit');
  };

  if (!user) return <LoadingSpinner />;

  return (
    <PageWrapper title="User Details | Management">
      <UserForm
        title={'Kullanıcı Detayları'}
        //handleSubmit={handleSubmitUpdate}
        //handleChange={handleChangeInput}
        formValues={formValues}
        isFormValid={isFormValid}
        //isSaving={isUpdating}
        disabled={isFormDisabled}
        showPasswordInput={false}
        handleClickEdit={handleClickEdit}
        showSubmitButton={false}
        showEditButton={true}
        //submitButtonText={'Güncelle'}
      />
    </PageWrapper>
  );
}

export default UserDetails;

//import React, {useContext, useEffect, useState} from 'react';
//import PageWrapper from '../../../Components/PageWrapper';
//import {Container, Row, Col, Table} from 'react-bootstrap';
//import {useParams} from 'react-router-dom';
//import axios from 'axios';
//import {AppContext} from '../../../Contexts/AppContext';
//import './Style/Users.css';
//import LoadingSpinner from '../../../Components/LoadingSpinner';

//function UserDetails() {
//  const {state} = useContext(AppContext);
//  const {id: userId} = useParams();
//  const [user, setUser] = useState();

//  useEffect(() => {
//    const source = axios.CancelToken.source();

//    const fetchUser = async () => {
//      const config = {
//        headers: {
//          Authorization: `Bearer ${state.token}`,
//        },
//      };

//      const {data} = await axios.get(
//        `${process.env.REACT_APP_API}/user/${userId}`,
//        config
//      );

//      setUser(data);
//    };
//    fetchUser();

//    return () => {
//      source.cancel();
//    };
//  }, []);

//  if (!user) return <LoadingSpinner />;
//  return (
//    <PageWrapper title="User Details | Management">
//      <Container className=" p-0 bg-light-dark " style={{margin: '0% auto'}}>
//        <Container className="p-3 bg-primary">
//          <h3>{'Kullanıcı Detayları'}</h3>
//        </Container>

//        <Table striped hover borderless>
//          <tbody>
//            {[
//              {label: 'Adı', value: user.firstName},
//              {label: 'Soyadı', value: user.lastName},
//              {label: 'Kullanıcı Adı', value: user.username},
//              {label: 'Rol', value: user.role},
//            ].map((item) => (
//              <tr key={item.label}>
//                <td className="col-md-2"> {item.label}:</td>
//                <td>{item.value}</td>
//              </tr>
//            ))}
//          </tbody>
//        </Table>
//      </Container>
//    </PageWrapper>
//  );
//}

//export default UserDetails;
