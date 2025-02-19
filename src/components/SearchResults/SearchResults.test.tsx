import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import SearchResults from './SearchResults';
import { describe, it, expect, vi } from 'vitest';

const mockPokemons = [
  {
    name: 'pikachu',
    height: 4,
    weight: 60,
    abilities: 'static',
    types: 'electric',
  },
  {
    name: 'bulbasaur',
    height: 7,
    weight: 69,
    abilities: 'overgrow',
    types: 'grass',
  },
];

const mockOnPokemonClick = vi.fn();

const renderWithRedux = (component) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe('SearchResults', () => {
  it('renders the list of pokemons', () => {
    renderWithRedux(
      <SearchResults
        pokemons={mockPokemons}
        currentPage={1}
        setCurrentPage={vi.fn()}
        totalPages={10}
        searchItem=""
        onPokemonClick={mockOnPokemonClick}
        isSearchingSpecificPokemon={false}
      />
    );

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
  });

  it('renders "No pokemons found" when the list is empty', () => {
    renderWithRedux(
      <SearchResults
        pokemons={[]}
        currentPage={1}
        setCurrentPage={vi.fn()}
        totalPages={10}
        searchItem=""
        onPokemonClick={mockOnPokemonClick}
        isSearchingSpecificPokemon={false}
      />
    );

    expect(screen.getByText('No pokemons found')).toBeInTheDocument();
  });

  it('calls onPokemonClick when a pokemon is clicked', () => {
    renderWithRedux(
      <SearchResults
        pokemons={mockPokemons}
        currentPage={1}
        setCurrentPage={vi.fn()}
        totalPages={10}
        searchItem=""
        onPokemonClick={mockOnPokemonClick}
        isSearchingSpecificPokemon={false}
      />
    );

    const pikachuElement = screen.getByText('Pikachu');
    fireEvent.click(pikachuElement);
    expect(mockOnPokemonClick).toHaveBeenCalledWith('pikachu');
  });

  it('checks and unchecks the checkbox when clicked', () => {
    renderWithRedux(
      <SearchResults
        pokemons={mockPokemons}
        currentPage={1}
        setCurrentPage={vi.fn()}
        totalPages={10}
        searchItem=""
        onPokemonClick={mockOnPokemonClick}
        isSearchingSpecificPokemon={false}
      />
    );

    const checkbox = screen.getByLabelText(mockPokemons[0].name.toLowerCase());
    fireEvent.click(checkbox);
    expect(store.getState().selectedItems.selectedItems).toContain('pikachu');

    fireEvent.click(checkbox);
    expect(store.getState().selectedItems.selectedItems).not.toContain(
      'pikachu'
    );
  });
});
