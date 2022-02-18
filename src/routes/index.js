import { useRoutes } from 'react-router-dom';

import Dashboard from './../components/Dashboard';
import Users from './../components/Users';
import Details from './../components/Details';
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
            path: "/details", 
            element: <Details />
        }, { 
            path: "*", 
            element: <NoMatch />
        }
    ]);

    return Routes;
};

export default RouteAsObj;