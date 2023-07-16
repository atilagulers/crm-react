import {useMemo, useState} from 'react';
import {useTable, useSortBy, useGlobalFilter, useFilters} from 'react-table';
import {Table} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faArrowUpAZ,
  faArrowDownAZ,
  faCircleInfo,
  faPhoneVolume,
} from '@fortawesome/free-solid-svg-icons';
import '../index.css';
import GlobalFilter from './GlobalFilter';
import CallEntryModal from '../Pages/CallLists/CallEntryModal';

function CallListTable({
  columns,
  data,
  handleClickDetails,
  hasColumnFilter = false,
}) {
  const columnsMemo = useMemo(() => columns, []);
  const dataMemo = useMemo(() => data, []);

  const [showEntryModal, setShowEntryModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState();

  const handleClickCallEntry = (customerId) => {
    const customer = data.find((c) => c._id === customerId);

    setSelectedCustomer(customer);
    setShowEntryModal(true);
  };

  const tableInstance = useTable(
    {
      columns: columnsMemo,
      data: dataMemo,
      sortTypes: {
        alphanumeric: (rowA, rowB, columnId) => {
          const valueA = rowA.values[columnId];
          const valueB = rowB.values[columnId];

          if (typeof valueA === 'object' && typeof valueB === 'object') {
            const firstNameA = valueA.firstName.toLowerCase();
            const firstNameB = valueB.firstName.toLowerCase();
            const lastNameA = valueA.lastName.toLowerCase();
            const lastNameB = valueB.lastName.toLowerCase();

            if (firstNameA === firstNameB) {
              return lastNameA.localeCompare(lastNameB);
            } else {
              return firstNameA.localeCompare(firstNameB);
            }
          } else {
            return String(valueA).localeCompare(String(valueB));
          }
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
    footerGroups,
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
        {/*Modal of entity form*/}
        {showEntryModal && (
          <CallEntryModal
            show={showEntryModal}
            setShow={setShowEntryModal}
            customer={selectedCustomer}
          />
        )}
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {handleClickDetails && <th style={{width: '5%'}}>Detay</th>}
              <th>Arama Giriş</th>
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
                <td
                  onClick={(e) => handleClickCallEntry(id)}
                  className="center-td"
                >
                  <FontAwesomeIcon
                    className="p-2"
                    icon={faPhoneVolume}
                    style={{height: '20px'}}
                  />
                </td>

                {row.cells.map((cell) => {
                  return (
                    <td key={cell.column.id} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
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

export default CallListTable;
