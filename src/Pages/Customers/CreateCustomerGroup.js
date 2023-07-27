import React, {useState, useContext} from 'react';
import CustomerGroupForm from './CustomerGroupForm';
import {useNavigate} from 'react-router-dom';
import PageWrapper from '../../Components/PageWrapper';
import BackButton from '../../Components/BackButton';
import {toast} from 'react-toastify';
import axios from 'axios';
import {AppContext} from '../../Contexts/AppContext';

function CreateCustomerGroup({title}) {
  const {state} = useContext(AppContext);

  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);

  const initialFormValues = {
    name: '',
    explanation: '',
  };
  const [formValues, setFormValues] = useState(initialFormValues);

  const handleChangeInput = (e) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const createCustomerGroup = async () => {
    try {
      setIsCreating(true);

      const body = {
        name: formValues.name,
        explanation: formValues.explanation,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      };

      const {data} = await axios.post(
        `${process.env.REACT_APP_API}/customer-group`,
        body,
        config
      );
      console.log(data);
      navigate(`/customers/customer-group/${data._id}`);

      toast.success(`${data.name} grubu başarıyla oluşturuldu.`);
    } catch (error) {
      if (error.response.status === 409) {
        toast.error('Bu grup zaten var.');
      } else {
        toast.error('Grup oluşturulamadı. ' + error);
      }
    } finally {
      setIsCreating(false);
    }
  };

  const handleSubmitCreate = async (e) => {
    e.preventDefault();

    await createCustomerGroup();

    setFormValues(initialFormValues);
  };

  return (
    <PageWrapper title="Create Customer Group">
      <BackButton />

      <CustomerGroupForm
        title={'Yeni Müşteri Grubu'}
        formValues={formValues}
        handleSubmit={handleSubmitCreate}
        handleChange={handleChangeInput}
        isSaving={isCreating}
      />
    </PageWrapper>
  );
}

export default CreateCustomerGroup;
