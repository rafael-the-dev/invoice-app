import { BrowserRouter, Switch, Router} from 'react-router-dom';
import Home from '../Home';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Router path='/' component={Home} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;