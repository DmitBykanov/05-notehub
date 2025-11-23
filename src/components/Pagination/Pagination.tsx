import ReactPaginate from "react-paginate";
import css from "../Pagination/Paginstion.module.css";

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedPage: number) => void;
}

function Pagination({ pageCount, onPageChange }: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="→"
      previousLabel="←"
      pageCount={pageCount}
      onPageChange={(data) => onPageChange(data.selected + 1)}
      containerClassName={css.pagination}
      activeClassName={css.active}
      pageClassName={css.pageItem}
      previousClassName={css.pageItem}
      nextClassName={css.pageItem}
    />
  );
}

export default Pagination;
