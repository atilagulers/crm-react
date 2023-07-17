import {useMemo} from 'react';
import {useTable, useSortBy, useGlobalFilter, useFilters} from 'react-table';
import {Table, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faArrowUpAZ,
  faArrowDownAZ,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import '../index.css';
import GlobalFilter from './GlobalFilter';

function HoldingReservationsTable({
  columns,
  data,
  handleClickDetails,
  hasColumnFilter = false,
  handleClickCreate,
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
              <th>Rezervasyon</th>
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
                  <Button
                    variant="primary"
                    onClick={() =>
                      handleClickCreate(
                        row.original.phone1 ||
                          row.original.phone2 ||
                          row.original.phone3
                      )
                    }
                    style={{width: '100%'}}
                  >
                    Oluştur
                  </Button>
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

export default HoldingReservationsTable;
