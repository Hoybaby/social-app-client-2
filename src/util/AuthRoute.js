import React, {useContext} from 'react';
import {Route, Redirect } from 'react-router-dom';
import { AuthContext} from '../context/auth';

// this function will handle the routing if a user is already logged in or not
function AuthRoute({component: Component, ...rest}) {
    const {user} = useContext(AuthContext);

    return (
        // this piece of code basically means that spread thats wraps and render a redirect to the home page or just the component that gets passed down
        <Route
            {...rest}
            render={(props) => 
                user ? <Redirect to="/"/> : <Component {...props}/>
            }
        />
    
    )
}

export default AuthRoute;