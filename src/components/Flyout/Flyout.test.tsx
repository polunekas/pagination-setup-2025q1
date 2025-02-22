import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Flyout from './Flyout';
import { clearItems } from '../../store/slices/selectedItemsSlice';

const mockStore = configureStore();
const mockDispatch = vi.fn();

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});

describe('Flyout component', () => {
  it('renders when items are selected', () => {
    const store = mockStore({
      selectedItems: { selectedItems: ['Pikachu', 'Bulbasaur'] },
    });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.getByText('2 items are selected')).toBeInTheDocument();
  });

  it('does not render when no items are selected', () => {
    const store = mockStore({
      selectedItems: { selectedItems: [] },
    });

    const { container } = render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(container.firstChild).toBeNull();
  });

  it('dispatches clearItems action when "Unselect all" button is clicked', () => {
    const store = mockStore({
      selectedItems: { selectedItems: ['Pikachu'] },
    });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    fireEvent.click(screen.getByText('Unselect all'));

    expect(mockDispatch).toHaveBeenCalledWith(clearItems());
  });
});
