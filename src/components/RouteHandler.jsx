import { Route, Navigate } from 'react-router-dom';
import { isLogged } from '../helpers/AuthHandler';

export default ({ children }) => {
    let logged = isLogged();
    return (
        <Route 
            render={()=>
                logged ? children : <Navigate to="/signin" />
            }
        />
    );
}