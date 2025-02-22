import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';
import '@testing-library/jest-dom';

describe('SearchBar', () => {
  const mockFromSearch = vi.fn();

  it('renders the search bar component', () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('updates the input value when typing', () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText('pikachu') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'bulbasaur' } });

    expect(input.value).toBe('bulbasaur');
  });

  it('calls fromSearch when the form is submitted', () => {
    render(<SearchBar fromSearch={mockFromSearch} />);

    const input = screen.getByPlaceholderText('pikachu');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'bulbasaur' } });
    fireEvent.click(button);

    expect(mockFromSearch).toHaveBeenCalledWith('bulbasaur');
  });

  it('calls fromSearch with an empty string when input is empty', () => {
    render(<SearchBar fromSearch={mockFromSearch} />);

    const input = screen.getByPlaceholderText('pikachu');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(button);

    expect(mockFromSearch).toHaveBeenCalledWith('');
  });

  it('clears the placeholder on input focus', () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText('pikachu');
    fireEvent.focus(input);

    expect(input.getAttribute('placeholder')).toBe('');
  });
});
