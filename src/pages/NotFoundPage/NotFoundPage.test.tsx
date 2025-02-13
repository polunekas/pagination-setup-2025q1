import { render, screen } from '@testing-library/react';
import NotFoundPage from './NotFoundPage';
import styles from './NotFoundPage.module.css';
import '@testing-library/jest-dom';

describe('NotFoundPage', () => {
  it('renders the 404 message', () => {
    render(<NotFoundPage />);

    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
    expect(
      screen.getByText('Oops! The page you are looking for does not exist.')
    ).toBeInTheDocument();
  });

  it('has the correct container class', () => {
    render(<NotFoundPage />);

    const container = screen.getByRole('heading', {
      name: '404 - Page Not Found',
    }).parentElement;
    expect(container).toHaveClass(styles.container);
  });
});
