import { BrowserRouter as Router } from 'react-router-dom';

import './assets/styles/main.scss';
import RouteAsObj from './routes/';


const App = () => {
    return (
        <main>
            <Router>
                <RouteAsObj />
            </Router>
        </main>
    )
};

export default App;
