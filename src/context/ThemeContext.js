import { createContext, useCallback, useEffect, useState } from 'react';

export const ThemeContext = createContext();
ThemeContext.displayName = 'ThemeContext';

export const ThemeContextProvider = ({ children }) => {
    const [ theme, setTheme ] = useState({ isLightTheme: true });

    const toggleTheme = useCallback(() => setTheme(theme => ({ ...theme, isLightTheme: !theme.isLightTheme})), []);

    useEffect(() => {
        if(theme.isLightTheme) {
            document.querySelector('html').classList.add('light-theme');
            document.querySelector('html').classList.remove('dark-theme');
        } else {
            document.querySelector('html').classList.remove('light-theme');
            document.querySelector('html').classList.add('dark-theme');
        }
    }, [ theme ])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>{ children }</ThemeContext.Provider>
    );
}