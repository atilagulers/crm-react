import React, {useState} from 'react';
import {Table, Container} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import CallEntryModal from './CallEntryModal';
import {formatDate} from '../../Helpers';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPhoneVolume, faCircleInfo} from '@fortawesome/free-solid-svg-icons';

function CallTable({customers}) {
  const navigate = useNavigate();
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState();

  const handleClickRow = (customerId) => {
    navigate(`/customers/${customerId}`);
  };

  const handleClickCallEntry = (customerId) => {
    const customer = customers.find((c) => c._id === customerId);

    setSelectedCustomer(customer);
    setShowEntryModal(true);
  };

  return (
    <Container className="px-0">
      <Table
        className="table call-table table-striped table-dark table-hover"
        striped
        bordered
        hover
        variant="dark"
      >
        {/*Modal of entity form*/}
        {showEntryModal && (
          <CallEntryModal
            show={showEntryModal}
            setShow={setShowEntryModal}
            customer={selectedCustomer}
          />
        )}

        <thead>
          <tr className="table-dark">
            <th style={{width: '5%'}}>Detay</th>
            <th>Arama Giriş</th>
            <th>Tarih</th>
            <th>Adı</th>
            <th>Soyadı</th>
            <th>Telefon 1</th>
            <th>Telefon 2</th>
            <th>Telefon 3</th>
            <th>Email</th>
            <th>Agent</th>
            <th>Grup</th>
          </tr>
        </thead>

        <tbody>
          {customers &&
            customers.map((customer, i) => {
              return (
                <tr key={i}>
                  <td onClick={(e) => handleClickRow(customer._id)}>
                    <FontAwesomeIcon className="p-2" icon={faCircleInfo} />
                  </td>
                  <td
                    onClick={(e) => handleClickCallEntry(customer._id)}
                    className="center-td"
                  >
                    <FontAwesomeIcon
                      className="p-2"
                      icon={faPhoneVolume}
                      style={{height: '20px'}}
                    />
                  </td>
                  <td>{formatDate(customer.callDate)}</td>
                  <td>{customer.firstName}</td>
                  <td>{customer.lastName}</td>
                  <td>{customer.phone1}</td>
                  <td>{customer.phone2}</td>
                  <td>{customer.phone3}</td>
                  <td>{customer.email}</td>
                  <td>{`${customer.user[0].firstName} ${customer.user[0].lastName}`}</td>

                  <td>{customer.customerGroup[0]?.name} </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Container>
  );
}

export default CallTable;
