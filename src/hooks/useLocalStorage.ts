import { useState, useEffect } from 'react';

function useLocalStorage(key: string, initialValue: string) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? item : initialValue;
  });

  useEffect(() => {
    if (storedValue !== initialValue) {
      localStorage.setItem(key, storedValue);
    }
  }, [key, storedValue, initialValue]);

  return [storedValue, setStoredValue] as const;
}

export default useLocalStorage;
