import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Для тестирования React-компонентов
    globals: true, // Включает глобальные переменные, такие как `expect`, `describe`, `it`
    setupFiles: './src/setupTests.ts', // Файл с настройками
    coverage: {
      provider: 'istanbul', // Используем Istanbul для покрытия
      include: ['**/*.tsx'], // Включаем только .tsx файлы
      exclude: [
        '**/node_modules/**',
        '**/*.test.tsx',
        '**/*.spec.tsx',
        'src/__tests__/setup.ts',
        'src/App.tsx', // Исключаем App.tsx
      ],
      reporter: ['text', 'json', 'html'], // Форматы отчетов
      thresholds: {
        lines: 70, // Минимальное покрытие для строк
        functions: 70, // Минимальное покрытие для функций
        branches: 70, // Минимальное покрытие для ветвей
        statements: 70, // Минимальное покрытие для выражений
      },
    },
  },
});
