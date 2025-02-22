import { FC } from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  isSearchingSpecificPokemon: boolean;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
  isSearchingSpecificPokemon,
}) => {
  return (
    <div className={styles.pagination}>
      <button
        className={styles.pageButton}
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1 || isSearchingSpecificPokemon}
      >
        Previous
      </button>
      <span className={styles.paginationPage}>
        Page {currentPage} of {totalPages}
      </span>
      <button
        className={styles.pageButton}
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages || isSearchingSpecificPokemon}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
