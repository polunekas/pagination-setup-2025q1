import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext';

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

test('toggles theme between light and dark', async () => {
  render(
    <ThemeProvider>
      <TestComponent />
    </ThemeProvider>
  );

  const themeElement = screen.getByTestId('theme');
  const button = screen.getByRole('button', { name: /toggle theme/i });

  expect(themeElement.textContent).toBe('light');

  fireEvent.click(button);

  await waitFor(() => expect(themeElement.textContent).toBe('dark'));

  fireEvent.click(button);

  await waitFor(() => expect(themeElement.textContent).toBe('light'));
});
