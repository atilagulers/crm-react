import {useMemo, useEffect, useState, useContext} from 'react';
import {useTable, useSortBy, useGlobalFilter, useFilters} from 'react-table';
import {Table, Dropdown} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faArrowUpAZ,
  faArrowDownAZ,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import '../index.css';
import GlobalFilter from './GlobalFilter';
import axios from 'axios';
import {AppContext} from '../Contexts/AppContext';
import LoadingSpinner from './LoadingSpinner';

function CustomerTable({
  columns,
  data,
  handleClickDetails,
  hasColumnFilter = false,
  handleSelectUser,
}) {
  const {state: appState} = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [isFetchingUsers, setIsFetchingUsers] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchUsers = async () => {
      //if (customers.length > 0) return setIsFetchingUsers(false);

      setIsFetchingUsers(true);
      try {
        const {data} = await axios.get(
          `${process.env.REACT_APP_API}/user/?page=1&limit=9999`,
          {
            headers: {
              Authorization: `Bearer ${appState.token}`,
            },
            cancelToken: source.token,
          }
        );

        setUsers(data.users);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetchingUsers(false);
      }
    };
    fetchUsers();

    return () => {
      source.cancel();
    };
  }, [appState.token]);

  const columnsMemo = useMemo(() => columns, [columns]);
  const dataMemo = useMemo(() => data, [data]);

  const tableInstance = useTable(
    {
      columns: columnsMemo,
      data: dataMemo,
      sortTypes: {
        alphanumeric: (rowA, rowB, columnId) => {
          const valueA = rowA.values[columnId];
          const valueB = rowB.values[columnId];
          return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
        },
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    //footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;

  const {globalFilter} = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <Table
        className="table table-striped table-dark table-hover"
        striped
        bordered
        hover
        variant="dark"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {handleClickDetails && <th style={{width: '5%'}}>Detay</th>}

              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}

                  {hasColumnFilter && (
                    <div>
                      {column.canFilter ? column.render('Filter') : null}
                    </div>
                  )}
                  <span className="ps-2">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FontAwesomeIcon icon={faArrowDownAZ} />
                      ) : (
                        <FontAwesomeIcon icon={faArrowUpAZ} />
                      )
                    ) : (
                      ''
                    )}
                  </span>
                </th>
              ))}
              <th>Agent</th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const {_id: id} = row.original;

            return (
              <tr key={row.id} {...row.getRowProps()}>
                {handleClickDetails && (
                  <td onClick={(e) => handleClickDetails(id)}>
                    <FontAwesomeIcon className="p-2" icon={faCircleInfo} />
                  </td>
                )}

                {row.cells.map((cell) => {
                  return (
                    <td key={cell.column.id} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}

                <td>
                  {isFetchingUsers ? (
                    <LoadingSpinner />
                  ) : (
                    <Dropdown
                      onSelect={(userId) => handleSelectUser(userId, id)}
                    >
                      <Dropdown.Toggle
                        variant="primary"
                        id={`user-dropdown-${id}`}
                        style={{width: '100%'}}
                        disabled={appState.user.role === 'admin' ? false : true}
                      >
                        {`${row.original.user[0]?.firstName} ${row.original.user[0]?.lastName}`}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {users?.map((user) => {
                          return (
                            <Dropdown.Item key={user._id} eventKey={user._id}>
                              {`${user.firstName} ${user.lastName}`}
                            </Dropdown.Item>
                          );
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {headerGroups.map((headerGroup) => (
            <tr key={`${headerGroup.id}-footer`}>
              {handleClickDetails && <td style={{width: '5%'}}>Detay</td>}

              {headerGroup.headers.map((column) => (
                <td key={column.id}>{column.render('Header')}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </Table>
    </>
  );
}

export default CustomerTable;
