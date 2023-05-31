import React, {useState} from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import '../Css/Components/Sidebar.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faLock,
  faUsers,
  faPhone,
  faCalendarDays,
  faMoneyBill1Wave,
  faBars,
} from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const handleClickToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Col
      lg={2}
      md={4}
      sm={4}
      xs={4}
      className={`sidebar bg-light-dark ${
        collapsed ? 'sidebar-collapsed' : ''
      }`}
      style={{height: '100vh', width: `${collapsed ? '60px' : ''}`}}
    >
      <Row onClick={handleClickToggle} className="sidebar-item">
        <FontAwesomeIcon icon={faBars} size="xl" />
      </Row>

      <Row className="sidebar-item">
        {' '}
        <FontAwesomeIcon icon={faHouse} size="xl" />
        <span className={`text-center`}>Ana Sayfa</span>
      </Row>
      <Row className="sidebar-item">
        <FontAwesomeIcon icon={faLock} size="xl" />
        <span className={`text-center`}>Yönetim</span>
      </Row>
      <Row className="sidebar-item">
        <FontAwesomeIcon icon={faUsers} size="xl" />
        <span className={`text-center`}>Müşteriler</span>
      </Row>
      <Row className="sidebar-item">
        <FontAwesomeIcon icon={faPhone} size="xl" />
        <span className={`text-center`}>Arama Listeleri</span>
      </Row>
      <Row className="sidebar-item">
        <FontAwesomeIcon icon={faCalendarDays} size="xl" />
        <span className={`text-center`}>Rezervasyonlar</span>
      </Row>
      <Row className="sidebar-item">
        <FontAwesomeIcon icon={faMoneyBill1Wave} size="xl" />
        <span className={`text-center`}>Krediler</span>
      </Row>
    </Col>
  );
}

export default Sidebar;
