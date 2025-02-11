import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Loader', () => {
  it('renders the loader component', () => {
    render(<Loader />);

    // Проверяем, что контейнер загрузчика отображается
    const loaderContainer = screen.getByTestId('loader-container');
    expect(loaderContainer).toBeInTheDocument();

    // Проверяем, что сам лоадер отображается
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });
});
