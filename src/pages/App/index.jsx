import { useMemo } from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import { ThemeContextProvider } from '../../context/ThemeContext';
import Home from '../Home';

const App = () => {
    const homeMemo = useMemo(() => <Home />, []);
    return (
        <ThemeContextProvider>
            <BrowserRouter>
                <Switch>
                    <Route path='/'>{ homeMemo }</Route>
                </Switch>
            </BrowserRouter>
        </ThemeContextProvider>
    );
};

export default App;