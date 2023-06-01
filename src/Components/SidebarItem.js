import React, {useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useNavigate} from 'react-router-dom';

function SidebarItem(props) {
  const navigate = useNavigate();
  const {
    name,
    icon,
    handleClickItem,
    handleHoverItem,
    activeSubMenu,
    listItems,
    itemIndex,
  } = props;

  return (
    <div
      className="sidebar-item"
      onClick={handleClickItem}
      onMouseEnter={() => handleHoverItem(itemIndex)}
      onMouseLeave={() => handleHoverItem(null)}
    >
      <FontAwesomeIcon icon={icon} size="xl" className="sidebar-item-icon" />
      <span className={`text-center`}>{name}</span>
      <ul
        className={`sub-menu bg-light-dark ${
          activeSubMenu === itemIndex && 'active'
        }`}
      >
        {listItems?.map((item, index) => (
          <li key={index} onClick={() => navigate(item.path)}>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SidebarItem;
