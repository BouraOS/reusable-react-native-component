// src/context/ThemeContext.js
import React, { createContext, useState } from 'react';
import lightTheme from '../theme/light';
import darkTheme from '../theme/dark';

// Create ThemeContext
export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme); // Default theme is light

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
