function ColumnFilter({column}) {
  const {filterValue, setFilter} = column;
  return (
    <span>
      Arama:{' '}
      <input
        value={filterValue || ''}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  );
}

export default ColumnFilter;
