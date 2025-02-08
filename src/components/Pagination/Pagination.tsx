import { FC } from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  isSearchingSpecificPokemon: boolean; // Добавляем новое свойство
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
  isSearchingSpecificPokemon, // Получаем новое состояние
}) => {
  return (
    <div className={styles.pagination}>
      <button
        className={styles.pageButton}
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1 || isSearchingSpecificPokemon} // Блокируем кнопку
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        className={styles.pageButton}
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages || isSearchingSpecificPokemon} // Блокируем кнопку
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
