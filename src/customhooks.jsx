import { useState, useEffect } from 'react';

const useStorage = (key, initialValue) => {
  const getStoredValue = (storage, key, initialValue) => {
    const storedValue = storage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : initialValue;
  };

  const [value, setValue] = useState(() => {
    const localValue = getStoredValue(localStorage, key, initialValue);
    if (localValue !== initialValue) return localValue;
    return getStoredValue(sessionStorage, key, initialValue);
  });

  useEffect(() => {
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
    sessionStorage.setItem(key, stringValue);
  }, [key, value]);

  return [value, setValue];
};

export default useStorage;