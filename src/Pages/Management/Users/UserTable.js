import React, {useEffect} from 'react';
import {Table} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

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
          <th>Adı</th>
          <th>Soyadı</th>
          <th>Kullanıcı Adı</th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.map((user, i) => {
            return (
              <tr onClick={() => handleClickUser(user.id)} key={i}>
                <td>{user.name}</td>
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
