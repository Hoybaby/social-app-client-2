import React, {useReducer, createContext} from 'react';

import jwtDecode from 'jwt-decode';

const initialState = {
    user: null
}

// This is checking for the jwt token that is being stored in the local storage when a user is created
if(localStorage.getItem('jwtToken')) {

    const decodedToken = jwtDecode(localStorage.getItem('jwtToken'))

    // basically saying if the token is less than the time, remove the jwt token else the user = token whjich then pulls the info
    if(decodedToken.exp *1000 < Date.now()) {
        localStorage.removeItem('jwtToken')
    } else {
        initialState.user = decodedToken;
    }
}

const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {}
})

// reducer,
function authReducer(state, action) {
    switch(action.type) {

        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }

        case 'LOGOUT':
            return{
                ...state,
                user: null
            }
        default:
            return state;
    }
}


function AuthProvider(props) {
    
    const [state, dispatch] = useReducer(authReducer, initialState);

    function login(userData) {
        localStorage.setItem('jwtToken', userData.token);
        dispatch({
            type: 'LOGIN',
            payload: userData
        });
    }

    function logout() {
        localStorage.removeItem('jwtToken');
        dispatch({ type: 'LOGOUT' });
    }

    return (
        <AuthContext.Provider
            value={{user: state.user, login, logout}}
            {...props}
            />
    )
}

export {AuthContext, AuthProvider};