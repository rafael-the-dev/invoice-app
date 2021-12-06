import { createContext, useCallback, useState } from 'react';

export const ThemeContext = createContext();
ThemeContext.displayName = 'ThemeContext';

export const ThemeContextProvider = ({ children }) => {
    const [ isLightTheme, setIsLightTheme ] = useState(true);

    const toggleTheme = useCallback(() => setIsLightTheme(theme => !theme), []);

    return (
        <ThemeContext.Provider value={{ isLightTheme, toggleTheme }}>{ children }</ThemeContext.Provider>
    );
}