import React, {useEffect} from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import '../Css/Components/Sidebar.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faHotel,
  faDice,
  faUsers,
  faPhone,
  faCalendarDays,
  faMoneyBill1Wave,
} from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  return (
    <Col style={{height: '100vh'}}>
      <h1 className="px-1 my-3">Actions</h1>

      <Row className="sidebar-item" style={{borderTop: '1px solid black'}}>
        <FontAwesomeIcon icon={faHouse} size="xl" />
        <span className="text-center">Home</span>
      </Row>
      <Row className="sidebar-item">
        <FontAwesomeIcon icon={faHotel} size="xl" />
        <span className="text-center">Hotels</span>
      </Row>
      <Row className="sidebar-item">
        <FontAwesomeIcon icon={faDice} size="xl" />
        <span className="text-center">Games</span>
      </Row>
      <Row className="sidebar-item">
        <FontAwesomeIcon icon={faUsers} size="xl" />
        <span className="text-center">Customers</span>
      </Row>
      <Row className="sidebar-item">
        <FontAwesomeIcon icon={faPhone} size="xl" />
        <span className="text-center">Call Lists</span>
      </Row>
      <Row className="sidebar-item">
        <FontAwesomeIcon icon={faCalendarDays} size="xl" />
        <span className="text-center">Reservations</span>
      </Row>
      <Row className="sidebar-item">
        <FontAwesomeIcon icon={faMoneyBill1Wave} size="xl" />
        <span className="text-center">Ledger</span>
      </Row>
    </Col>
  );
}

export default Sidebar;
