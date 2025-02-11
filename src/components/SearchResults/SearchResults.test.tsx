import { render, screen, fireEvent } from '@testing-library/react';
import SearchResults from './SearchResults';
import '@testing-library/jest-dom';

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

describe('SearchResults', () => {
  it('renders the list of pokemons', () => {
    render(
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

    // Проверяем, что покемоны отображаются
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
  });

  it('renders "No pokemons found" when the list is empty', () => {
    render(
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

    // Проверяем, что сообщение отображается
    expect(screen.getByText('No pokemons found')).toBeInTheDocument();
  });

  it('calls onPokemonClick when a pokemon is clicked', () => {
    render(
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

  it('renders the Pagination component', () => {
    render(
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

    // Проверяем, что пагинация отображается
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });
});
