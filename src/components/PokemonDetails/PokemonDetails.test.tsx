import { render, screen, waitFor } from '@testing-library/react';
import { useParams, useNavigate } from 'react-router-dom';
import PokemonDetails from './PokemonDetails';
import { fetchPokemonData } from '../../utils/api';
import '@testing-library/jest-dom';

vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
  useNavigate: vi.fn(),
}));

vi.mock('../../utils/api', () => ({
  fetchPokemonData: vi.fn(),
}));

describe('PokemonDetails', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.mocked(useParams).mockReset();
    vi.mocked(fetchPokemonData).mockReset();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it('renders loader while fetching data', () => {
    vi.mocked(useParams).mockReturnValue({ id: '1' });
    vi.mocked(fetchPokemonData).mockImplementation(() => new Promise(() => {}));

    render(<PokemonDetails />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders pokemon details after data is fetched', async () => {
    vi.mocked(useParams).mockReturnValue({ id: '1' });
    vi.mocked(fetchPokemonData).mockResolvedValue({
      name: 'pikachu',
      height: 4,
      weight: 60,
      abilities: [{ ability: { name: 'static' } }],
      types: [{ type: { name: 'electric' } }],
    });

    render(<PokemonDetails />);

    await waitFor(() =>
      expect(screen.getByText('pikachu')).toBeInTheDocument()
    );

    expect(screen.getByText('Height: 4')).toBeInTheDocument();
    expect(screen.getByText('Weight: 60')).toBeInTheDocument();
    expect(screen.getByText('Abilities: static')).toBeInTheDocument();
    expect(screen.getByText('Types: electric')).toBeInTheDocument();
  });
});
