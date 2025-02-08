import { FC, useState } from 'react';
import styles from './SearchBar.module.css';
import useLocalStorage from '../../hooks/useLocalStorage';

interface SearchBarProps {
  fromSearch?: (searchItem: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ fromSearch }) => {
  const [searchItem, setSearchItem] = useLocalStorage('searchItem', '');
  const [placeholder, setPlaceholder] = useState('pikachu');
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchItem(value);

    if (value.trim() === '' && fromSearch) {
      fromSearch('');
    }
  };

  const handleSearch = () => {
    const trimmedSearchItem = searchItem.trim();
    setSearchItem(trimmedSearchItem);

    if (fromSearch) {
      fromSearch(trimmedSearchItem);
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchItem.trim() === '') {
      if (fromSearch) fromSearch('');
      return;
    }

    handleSearch();
  };

  const handleFocus = () => {
    setPlaceholder('');
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.searchBarContainer}>
      <input
        type="text"
        value={searchItem}
        onChange={handleInputChange}
        placeholder={placeholder}
        onFocus={handleFocus}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Search
      </button>
      {showAlert && (
        <div className={styles.alert}>
          <p>Please enter a search term.</p>
          <button onClick={closeAlert} className={styles.closeAlertButton}>
            Close
          </button>
        </div>
      )}
    </form>
  );
};

export default SearchBar;
