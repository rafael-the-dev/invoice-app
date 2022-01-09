import { useMemo } from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import { AppContextProvider } from '../../context/AppContext';
import { ThemeContextProvider } from '../../context/ThemeContext';
import Home from '../Home';
import Invoice from '../Invoice';
import DeleteDialog from '../../components/DeleteDialog';

const App = () => {
    const homeMemo = useMemo(() => <Home />, []);
    const invoiceMemo = useMemo(() => <Invoice />, []);
    return (
        <ThemeContextProvider>
            <AppContextProvider>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/invoice/:id'><>{ invoiceMemo } <DeleteDialog /></></Route>
                        <Route path='/'><>{ homeMemo } <DeleteDialog /></></Route>
                    </Switch>
                </BrowserRouter>
                
            </AppContextProvider>
        </ThemeContextProvider>
    );
};

export default App;