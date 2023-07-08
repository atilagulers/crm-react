import {Table} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleInfo} from '@fortawesome/free-solid-svg-icons';

function CustomerGroupTable({customerGroups}) {
  const navigate = useNavigate();

  const handleClickGroup = (groupId) => {
    navigate(`${groupId}`);
  };

  return (
    <div>
      <Table
        className="table customer-table table-striped table-dark table-hover"
        striped
        bordered
        hover
        variant="dark"
      >
        <thead>
          <tr className="table-dark">
            <th style={{width: '5%'}}>Detay</th>
            <th>Grup Adı</th>
            <th>Açıklama</th>
          </tr>
        </thead>
        <tbody>
          {customerGroups &&
            customerGroups.map((group, i) => {
              return (
                <tr key={i}>
                  <td onClick={(e) => handleClickGroup(group._id)}>
                    <FontAwesomeIcon className="p-2" icon={faCircleInfo} />
                  </td>
                  <td>{group.name}</td>
                  <td>{group.explanation}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}

export default CustomerGroupTable;
