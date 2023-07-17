import {useMemo} from 'react';
import {useTable, useSortBy, useGlobalFilter, useFilters} from 'react-table';
import {Table} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faArrowUpAZ,
  faArrowDownAZ,
  faCircleInfo,
  faFilePen,
} from '@fortawesome/free-solid-svg-icons';
import '../index.css';
import GlobalFilter from './GlobalFilter';

function FilteringTable({
  columns,
  data,
  handleClickDetails,
  hasColumnFilter = false,
  firstColumnText = 'Detay',
  icon = '',
}) {
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
              {handleClickDetails && (
                <th style={{width: '5%'}}>{firstColumnText}</th>
              )}
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
                  <td
                    onClick={(e) => handleClickDetails(id)}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <FontAwesomeIcon
                      className="p-2"
                      icon={icon ? faFilePen : faCircleInfo}
                    />
                  </td>
                )}

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
              {handleClickDetails && (
                <td style={{width: '5%'}}>{firstColumnText}</td>
              )}

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

export default FilteringTable;
