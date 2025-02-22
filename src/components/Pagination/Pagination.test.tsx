import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination', () => {
  const mockSetCurrentPage = vi.fn();

  const renderPagination = (
    props: Partial<React.ComponentProps<typeof Pagination>> = {}
  ) => {
    const defaultProps: React.ComponentProps<typeof Pagination> = {
      currentPage: 1,
      setCurrentPage: mockSetCurrentPage,
      totalPages: 10,
      isSearchingSpecificPokemon: false,
    };

    return render(<Pagination {...defaultProps} {...props} />);
  };

  it('renders correctly with initial props', () => {
    renderPagination();
    expect(screen.getByText('Page 1 of 10')).toBeInTheDocument();
    expect(screen.getByText('Previous')).toBeDisabled();
    expect(screen.getByText('Next')).not.toBeDisabled();
  });

  it('disables "Next" button on the last page', () => {
    renderPagination({ currentPage: 10 });
    expect(screen.getByText('Next')).toBeDisabled();
  });

  it('disables "Previous" button on the first page', () => {
    renderPagination({ currentPage: 1 });
    expect(screen.getByText('Previous')).toBeDisabled();
  });

  it('calls setCurrentPage with the correct page number when "Next" is clicked', () => {
    renderPagination({ currentPage: 2 });
    fireEvent.click(screen.getByText('Next'));
    expect(mockSetCurrentPage).toHaveBeenCalledWith(3);
  });

  it('calls setCurrentPage with the correct page number when "Previous" is clicked', () => {
    renderPagination({ currentPage: 2 });
    fireEvent.click(screen.getByText('Previous'));
    expect(mockSetCurrentPage).toHaveBeenCalledWith(1);
  });

  it('disables both buttons when isSearchingSpecificPokemon is true', () => {
    renderPagination({ isSearchingSpecificPokemon: true });
    expect(screen.getByText('Previous')).toBeDisabled();
    expect(screen.getByText('Next')).toBeDisabled();
  });
});
