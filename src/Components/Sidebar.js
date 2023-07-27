import React, {useState, useContext} from 'react';
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
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import SidebarItem from './SidebarItem';
import {AppContext} from '../Contexts/AppContext';

function Sidebar(props) {
  const {state, dispatch} = useContext(AppContext);
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
  //const handleClickCustomers = (e) => {
  //  e.preventDefault();
  //  navigate('/customers');
  //};
  //const handleClickCallLists = (e) => {
  //  e.preventDefault();
  //  navigate('/call-lists/today');
  //};
  //const handleClickReservations = (e) => {
  //  e.preventDefault();
  //  navigate('/reservations/today');
  //};
  const handleClickCredits = (e) => {
    e.preventDefault();
    navigate('/credits');
  };

  const handleClickLogOut = (e) => {
    dispatch({type: 'LOG_OUT'});
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
        hasSubmenu={false}
        activeSubMenu={activeSubMenu}
        itemIndex={2}
      />
      {state.user.role === 'admin' && (
        <SidebarItem
          name={'Yönetim'}
          icon={faLock}
          handleClickItem={handleClickManagement}
          handleHoverItem={handleHoverItem}
          activeSubMenu={activeSubMenu}
          itemIndex={3}
          list={[
            {
              title: 'Kullanıcılar',
              itemsList: [
                {label: 'Listele', path: '/management/users'},
                {label: 'Oluştur', path: 'management/users/create'},
              ],
            },
            {
              title: 'Oteller',
              itemsList: [
                {label: 'Listele', path: '/management/hotels'},
                {label: 'Oluştur', path: 'management/hotels/create'},
              ],
            },
            {
              title: 'Oyunlar',
              itemsList: [
                {label: 'Listele', path: '/management/games'},
                {label: 'Oluştur', path: 'management/games/create'},
              ],
            },

            {
              title: 'Havayolları',
              itemsList: [
                {label: 'Listele', path: '/management/airlines'},
                {label: 'Oluştur', path: 'management/airlines/create'},
              ],
            },
          ]}
        />
      )}

      <SidebarItem
        name={'Müşteriler'}
        icon={faUsers}
        handleClickItem={handleClickManagement}
        handleHoverItem={handleHoverItem}
        activeSubMenu={activeSubMenu}
        itemIndex={4}
        list={[
          {
            title: 'Müşteriler',
            itemsList: [
              {label: 'Listele', path: '/customers'},
              {
                label: 'Oluştur',
                path: '/customers/create',
                disabled: state.user.role !== ' admin',
              },
              {label: 'Beklemede Olanlar', path: '/customers/hold'},
            ],
          },
          {
            title: 'Müşteri Grupları',
            itemsList: [
              {
                label: 'Listele',
                path: '/customers/customer-groups',
              },
              {
                label: 'Oluştur',
                path: '/customers/customer-groups/create',
                disabled: state.user.role !== ' admin',
              },
            ],
          },
        ]}
      />

      <SidebarItem
        name={'Arama Listeleri'}
        icon={faPhone}
        handleClickItem={handleClickManagement}
        handleHoverItem={handleHoverItem}
        activeSubMenu={activeSubMenu}
        itemIndex={5}
        list={[
          {
            title: 'Arama Listeleri',
            itemsList: [
              {label: 'Bugüne Planlanan', path: '/call-lists/today'},
              {label: 'Aranacaklar', path: '/call-lists/future'},
              {label: 'Arama Geçmişi', path: '/call-lists/history'},
            ],
          },
        ]}
      />

      <SidebarItem
        name={'Rezervasyonlar'}
        icon={faCalendarDays}
        handleClickItem={handleClickManagement}
        handleHoverItem={handleHoverItem}
        activeSubMenu={activeSubMenu}
        itemIndex={6}
        list={[
          {
            title: 'Arama Listeleri',
            itemsList: [
              {label: 'Bugüne Planlanan', path: '/reservations/today'},
              {label: 'Gelecek Rezervasyonlar', path: '/reservations/future'},
              {label: 'Rezervasyon Geçmişi', path: '/reservations/history'},
              {label: 'Rezervasyon Oluştur', path: '/reservations/create'},
              {
                label: 'Beklemede Olanlar',
                path: '/reservations/hold',
              },
            ],
          },
        ]}
      />

      <div className="sidebar-item" onClick={handleClickCredits}>
        <FontAwesomeIcon
          icon={faMoneyBill1Wave}
          size="xl"
          className="sidebar-item-icon"
        />
        <span className={`text-center`}>Krediler</span>
      </div>
      <div className="sidebar-item" onClick={handleClickLogOut}>
        <FontAwesomeIcon
          icon={faRightFromBracket}
          size="xl"
          className="sidebar-item-icon"
        />
        <span className={`text-center`}>Log out</span>
      </div>
    </Col>
  );
}

export default Sidebar;
