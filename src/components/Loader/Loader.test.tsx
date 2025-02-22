import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Loader', () => {
  it('renders the loader component', () => {
    render(<Loader />);

    const loaderContainer = screen.getByTestId('loader-container');
    expect(loaderContainer).toBeInTheDocument();

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });
});
