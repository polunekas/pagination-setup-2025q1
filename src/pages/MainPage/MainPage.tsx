import { FC, useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import styles from './MainPage.module.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchResults from '../../components/SearchResults/SearchResults';
import Loader from '../../components/Loader/Loader';
import useSearch from '../../hooks/useSearch';
import pokemonHeader from '../../assets/pokemon_header.webp';
import Flyout from '../../components/Flyout/Flyout';
import { useGetPokemonsListQuery } from '../../store/api/pokemonApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useTheme } from '../../context/ThemeContext';
import { Pokemon } from '../../types/types';

const MainPage: FC = () => {
  const { searchPokemon, currentPage, setCurrentPage, totalPages, searchItem } =
    useSearch(localStorage.getItem('searchItem') || '');
  const {
    data: pokemons,
    isLoading,
    isError,
    error,
  } = useGetPokemonsListQuery({
    page: currentPage,
    limit: 6,
  });
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.selectedItems
  );

  const navigate = useNavigate();
  const location = useLocation();
  const [throwError, setThrowError] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setIsDetailsOpen(location.pathname.includes('/details/'));
  }, [location]);

  const handlePokemonClick = (id: string) => {
    navigate(`/details/${id}`);
  };

  const handleCloseDetails = () => {
    navigate('/');
  };

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      isDetailsOpen &&
      detailsRef.current &&
      !detailsRef.current.contains(event.target as Node)
    ) {
      handleCloseDetails();
    }
  };

  if (throwError) {
    throw new Error('Test Error');
  }

  const isSearchingSpecificPokemon =
    pokemons?.length === 1 && searchItem !== '';

  const transformedPokemons: Pokemon[] =
    pokemons?.map((pokemon) => ({
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      abilities: pokemon.abilities.map((a) => a.ability.name).join(', '),
      types: pokemon.types.map((t) => t.type.name).join(', '),
    })) || [];

  return (
    <div className={`${styles.root} ${theme === 'dark' ? styles.dark : ''}`}>
      <button onClick={toggleTheme} className={styles.themeButton}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
      <div className={styles.container}>
        <header className={styles.header}>
          <img
            src={pokemonHeader}
            alt="Pokemon"
            className={styles.headerLogo}
          />
        </header>
        <SearchBar fromSearch={searchPokemon} />
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <p>Error: {error?.toString()}</p>
        ) : (
          <div className={styles.mainContainer}>
            <section
              className={styles.resultsContainer}
              onClick={handleContainerClick}
            >
              <SearchResults
                pokemons={transformedPokemons}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                searchItem={searchItem}
                onPokemonClick={handlePokemonClick}
                isSearchingSpecificPokemon={isSearchingSpecificPokemon}
              />
              {selectedItems.length > 0 && <Flyout />}
            </section>
            <section className={styles.rightSection} ref={detailsRef}>
              <Outlet />
              {isDetailsOpen && (
                <button
                  onClick={handleCloseDetails}
                  className={styles.closeButton}
                >
                  Close Details
                </button>
              )}
            </section>
          </div>
        )}
        <button
          className={styles.errorButton}
          onClick={() => setThrowError(true)}
        >
          Throw Error
        </button>
      </div>
    </div>
  );
};

export default MainPage;
