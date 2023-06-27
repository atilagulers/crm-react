import React, {useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import '../Css/Components/Pagination.css';

function Pagination({handleClickPage, totalPages, currentPage}) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handleClickPage}
      pageRangeDisplayed={5}
      pageCount={totalPages}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
      containerClassName="pagination justify-content-center"
      pageClassName="page-item "
      pageLinkClassName="page-link"
      activeClassName="active"
      activeLinkClassName="bg-primary"
      previousClassName="page-item "
      previousLinkClassName="page-link "
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      forcePage={currentPage}
    />
  );
}

export default Pagination;
