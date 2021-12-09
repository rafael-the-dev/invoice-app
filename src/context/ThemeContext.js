import { createContext, useCallback, useState } from 'react';

export const ThemeContext = createContext();
ThemeContext.displayName = 'ThemeContext';

export const ThemeContextProvider = ({ children }) => {
    const [ theme, setTheme ] = useState({ isLightTheme: true });

    const toggleTheme = useCallback(() => setTheme(theme => ({ ...theme, isLightTheme: !theme.isLightTheme})), []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>{ children }</ThemeContext.Provider>
    );
}