import React, {useEffect, useState, useContext} from 'react';
import PageWrapper from '../../Components/PageWrapper';
import {Row, Table, Container} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import LoadingSpinner from '../../Components/LoadingSpinner';
import axios from 'axios';
import {AppContext} from '../../Contexts/AppContext';

function CustomerDetails() {
  const {state} = useContext(AppContext);
  const {id: userId} = useParams();
  const [customer, setCustomer] = useState();

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchHotel = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      };

      const {data} = await axios.get(
        `${process.env.REACT_APP_API}/customer/${userId}`,
        config
      );

      setCustomer(data);
    };
    fetchHotel();

    return () => {
      source.cancel();
    };
  }, []);

  if (!customer) return <LoadingSpinner />;

  return (
    <PageWrapper title={'Details | Customer'}>
      <Container className=" p-0 bg-light-dark " style={{margin: '0% auto'}}>
        <Container className="p-3 bg-primary">
          <h3>{'Müşteri Detayları'}</h3>
        </Container>

        <Table striped hover borderless>
          <tbody>
            {[
              {label: 'TC', value: customer.tc},
              {label: 'Adı', value: customer.firstName},
              {label: 'Soyadı', value: customer.lastName},
              {label: 'Telefon 1', value: customer.phone1},
              {label: 'Telefon 2', value: customer.phone2},
              {label: 'Telefon 3', value: customer.phone3},
              {label: 'Email', value: customer.email},
              {label: 'Doğum Tarihi', value: customer.birthday},
              {label: 'Adres', value: customer.address},
              {label: 'İş Adresi', value: customer.workAddress},
              {label: 'Şehir', value: customer.city},
              {label: 'Cinsiyet', value: customer.gender},
              {
                label: 'Agent',
                value: `${customer.user.firstName} ${customer.user.lastName}`,
              },
            ].map((item, i) => (
              <tr key={i}>
                <td className="col-md-2"> {item.label}:</td>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </PageWrapper>
  );
}

export default CustomerDetails;
