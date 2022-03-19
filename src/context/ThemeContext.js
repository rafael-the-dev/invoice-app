import { createContext, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { changeTheme, toggleStateTheme } from '../redux/actions';
import { getTheme } from '../redux/selectors';

export const ThemeContext = createContext();
ThemeContext.displayName = 'ThemeContext';

export const ThemeContextProvider = ({ children }) => {
    const dispatch = useDispatch();
    const theme = useSelector(getTheme)

    const toggleTheme = useCallback(() => dispatch(toggleStateTheme()), [ dispatch ]);


    useEffect(() => {
        if(!localStorage.getItem('invoice-app__isLightTheme')) {
            localStorage.setItem('invoice-app__isLightTheme', JSON.stringify(false));
        }
    }, []);

    useEffect(() => {
        const stringifiedTheme = localStorage.getItem('invoice-app__isLightTheme');
        if(stringifiedTheme) {
            const storedTheme = JSON.parse(stringifiedTheme);
            dispatch(changeTheme({ isLightTheme: storedTheme }))
        }
    }, [ dispatch ]);

    useEffect(() => {
        if(theme.isLightTheme) {
            document.querySelector('html').classList.add('light-theme');
            document.querySelector('html').classList.remove('dark-theme');
        } else {
            document.querySelector('html').classList.remove('light-theme');
            document.querySelector('html').classList.add('dark-theme');
        }
        localStorage.setItem('invoice-app__isLightTheme', JSON.stringify(theme.isLightTheme));
    }, [ theme ])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>{ children }</ThemeContext.Provider>
    );
}