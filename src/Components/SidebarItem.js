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
    list,
    itemIndex,
    hasSubmenu = true,
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
      {activeSubMenu === itemIndex && hasSubmenu && (
        <div className={`sub-menu active `}>
          {list?.map((subMenu, index) => (
            <div key={index}>
              <h6 className="sub-menu-title bg-dark ps-2 py-3  p-0 m-0">
                {subMenu.title}
              </h6>
              <ul
                key={index}
                className={`p-0 bg-light-dark m-0 ${
                  activeSubMenu === itemIndex && 'active'
                }`}
                style={{listStyle: 'none'}}
              >
                {subMenu?.itemsList?.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => navigate(item.path)}
                    style={{display: `${item.disabled ? 'none' : ''}`}}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SidebarItem;
