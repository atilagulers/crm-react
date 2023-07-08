import {Table} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleInfo} from '@fortawesome/free-solid-svg-icons';

function UserTable({users}) {
  const navigate = useNavigate();

  const handleClickUser = (userId) => {
    navigate(`${userId}`);
  };

  return (
    <Table
      className="table user-table table-striped table-dark table-hover"
      striped
      bordered
      hover
      variant="dark"
    >
      <thead>
        <tr className="table-dark">
          <th style={{width: '5%'}}>Detay</th>
          <th>Adı</th>
          <th>Soyadı</th>
          <th>Kullanıcı Adı</th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.map((user, i) => {
            return (
              <tr key={i}>
                <td onClick={(e) => handleClickUser(user._id)}>
                  <FontAwesomeIcon className="p-2" icon={faCircleInfo} />
                </td>

                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.username}</td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
}

export default UserTable;
