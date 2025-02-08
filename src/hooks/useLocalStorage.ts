import { useState, useEffect } from 'react';

function useLocalStorage(key: string, initialValue: string) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item !== null ? item : initialValue;
  });

  useEffect(() => {
    if (storedValue === '') {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, storedValue);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}

export default useLocalStorage;
