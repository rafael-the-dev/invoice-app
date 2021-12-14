import { useMemo } from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import { ThemeContextProvider } from '../../context/ThemeContext';
import Home from '../Home';
import Invoice from '../Invoice';

const App = () => {
    const homeMemo = useMemo(() => <Home />, []);
    const invoiceMemo = useMemo(() => <Invoice />, []);
    return (
        <ThemeContextProvider>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/invoice'>{ invoiceMemo }</Route>
                    <Route path='/'>{ homeMemo }</Route>
                </Switch>
            </BrowserRouter>
        </ThemeContextProvider>
    );
};

export default App;