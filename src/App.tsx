import React, { Component, type ReactNode, createRef } from 'react';
import styles from './App.module.css';
import pikachuGif from './assets/pikachu-pokemon.gif';
import pokemonHeader from './assets/pokemon_header.webp';

interface Pokemon {
  name: string;
  height: number;
  weight: number;
  abilities: string;
  types: string;
}

interface AppState {
  searchItem: string;
  pokemons: Pokemon[];
  error: string | null;
  isLoading: boolean;
  showPopup: boolean;
  throwError: boolean;
}

class App extends Component<object, AppState> {
  resultsContainerRef: React.RefObject<HTMLDivElement>;

  constructor(props: object) {
    super(props);
    this.state = {
      searchItem: '',
      pokemons: [],
      error: null,
      isLoading: false,
      showPopup: false,
      throwError: false,
    };
    this.resultsContainerRef = createRef();
  }

  componentDidMount() {
    const savedSearchItem = localStorage.getItem('searchItem');
    if (savedSearchItem) {
      this.handleSearch(savedSearchItem);
    } else {
      this.handleSearch('');
    }
  }

  handleSearch = async (searchItem: string) => {
    this.setState({ searchItem, error: null, isLoading: true });
  };

  togglePopup = () => {
    this.setState((prevState) => ({ showPopup: !prevState.showPopup }));
  };

  triggerError = () => {
    this.setState({ throwError: true });
  };

  handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      this.togglePopup();
    }
  };

  render(): ReactNode {
    if (this.state.throwError) {
      throw new Error('Test error thrown');
    }

    return (
      <div id="root" className={styles.root}>
        <header className={styles.header}>
          <img
            src={pokemonHeader}
            alt="Pokemon"
            className={styles.headerLogo}
          />
          <button
            className={styles.descriptionButton}
            onClick={this.togglePopup}
          >
            How to use
          </button>
          <button className={styles.errorButton} onClick={this.triggerError}>
            Throw Error
          </button>
        </header>
        {this.state.showPopup && (
          <>
            <div
              className={styles.overlay}
              role="button"
              tabIndex={0}
              onClick={this.togglePopup}
              onKeyDown={this.handleKeyPress}
              aria-label="Close popup"
            ></div>
            <dialog open className={`${styles.popup} ${styles.fadeIn}`}>
              <h2>How to use the search</h2>
              <p>Type the name of a Pokémon and click Search or press Enter.</p>
              <p>Example: pikachu</p>
              <button className={styles.closeButton} onClick={this.togglePopup}>
                Close
              </button>
            </dialog>
          </>
        )}

        <img src={pikachuGif} alt="Pikachu" className={styles.fixedGif} />
      </div>
    );
  }
}

export default App;
