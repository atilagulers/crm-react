import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Col} from 'react-bootstrap';
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
import SidebarItem from './SidebarItem';

function Sidebar(props) {
  const navigate = useNavigate();
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const handleClickHome = (e) => {
    e.preventDefault();
    navigate('/');
  };
  const handleClickManagement = (e) => {
    e.preventDefault();
    //navigate('/management');
  };
  const handleClickCustomers = (e) => {
    e.preventDefault();
    navigate('/customers');
  };
  const handleClickCallLists = (e) => {
    e.preventDefault();
    navigate('/call-lists');
  };
  const handleClickReservations = (e) => {
    e.preventDefault();
    navigate('/reservations');
  };
  const handleClickCredits = (e) => {
    e.preventDefault();
    navigate('/credits');
  };

  const handleHoverItem = (id) => {
    setActiveSubMenu(id);
  };

  return (
    <Col>
      <div className="sidebar-item" onClick={props.handleClickSidebarToggle}>
        <FontAwesomeIcon
          icon={faBars}
          size="xl"
          className="sidebar-item-icon"
        />
        <span className={`text-center`}>Menu</span>
      </div>

      <SidebarItem
        name={'Ana Sayfa'}
        icon={faHouse}
        handleClickItem={handleClickHome}
        handleHoverItem={handleHoverItem}
        activeSubMenu={activeSubMenu}
        itemIndex={2}
      />

      <SidebarItem
        name={'Yönetim'}
        icon={faLock}
        handleClickItem={handleClickManagement}
        handleHoverItem={handleHoverItem}
        activeSubMenu={activeSubMenu}
        itemIndex={3}
        listItems={[
          {label: 'Kullanıcılar', path: '/management/users'},
          {label: 'Oteller', path: '/management/hotels'},
          {label: 'Oyunlar', path: '/management/games'},
          {label: 'Hava Yolları', path: '/management/airlines'},
        ]}
      />

      <div className="sidebar-item" onClick={handleClickCustomers}>
        <FontAwesomeIcon
          icon={faUsers}
          size="xl"
          className="sidebar-item-icon"
        />
        <span className={`text-center`}>Müşteriler</span>
      </div>
      <div className="sidebar-item" onClick={handleClickCallLists}>
        <FontAwesomeIcon
          icon={faPhone}
          size="xl"
          className="sidebar-item-icon"
        />
        <span className={`text-center`}>Arama Listeleri</span>
      </div>
      <div className="sidebar-item" onClick={handleClickReservations}>
        <FontAwesomeIcon
          icon={faCalendarDays}
          size="xl"
          className="sidebar-item-icon"
        />
        <span className={`text-center`}>Rezervasyonlar</span>
      </div>
      <div className="sidebar-item" onClick={handleClickCredits}>
        <FontAwesomeIcon
          icon={faMoneyBill1Wave}
          size="xl"
          className="sidebar-item-icon"
        />
        <span className={`text-center`}>Krediler</span>
      </div>
    </Col>
  );
}

export default Sidebar;
