import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from '../Home';

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route path='/' component={Home} />
                </Switch>
            </BrowserRouter>
        </>
    );
};

export default App;