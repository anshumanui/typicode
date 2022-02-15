import { useRoutes } from 'react-router-dom';

import Dashboard from './../components/Dashboard';
import Users from './../components/Users';
import Todos from './../components/Todos';
import Albums from './../components/Albums';
import NoMatch from './../components/NoMatch';


const RouteAsObj = () => {
    const Routes = useRoutes([
        {
            path: "/", 
            element: <Dashboard />
        }, { 
            path: "/users", 
            element: <Users />
        }, { 
            path: "/todos", 
            element: <Todos />
        }, { 
            path: "/albums", 
            element: <Albums />
        }, { 
            path: "*", 
            element: <NoMatch />
        }
    ]);

    return Routes;
};

export default RouteAsObj;