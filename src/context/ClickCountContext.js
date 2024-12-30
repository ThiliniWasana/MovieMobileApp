import React, { createContext, useContext, useState } from 'react';

// Create Context
const ClickCountContext = createContext();

// Custom Hook to Use Context
export const useClickCount = () => useContext(ClickCountContext);

// Provider Component
export const ClickCountProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  const incrementCount = () => setCount((prevCount) => prevCount + 1);

  return (
    <ClickCountContext.Provider value={{ count, incrementCount }}>
      {children}
    </ClickCountContext.Provider>
  );
};
