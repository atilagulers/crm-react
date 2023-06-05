import React, {useEffect} from 'react';
import {Table, Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

function CustomerGroupTable({customerGroups}) {
  const navigate = useNavigate();

  const handleClickRow = (groupId) => {
    navigate(`${groupId}`);
  };

  return (
    <div>
      {/*<Button
        onClick={() => navigate(-1)}
        variant="link"
        className="text-light"
      >
        {'\u003C'} Geri
      </Button>*/}
      <Table
        className="table customer-table table-striped table-dark table-hover"
        striped
        bordered
        hover
        variant="dark"
      >
        <thead>
          <tr className="table-dark">
            <th>Grup Adı</th>
            <th>Açıklama</th>
          </tr>
        </thead>
        <tbody>
          {customerGroups &&
            customerGroups.map((group, i) => {
              return (
                <tr onClick={() => handleClickRow(group.id)} key={i}>
                  <td>{group.name}</td>
                  <td>{group.aciklama}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}

export default CustomerGroupTable;
