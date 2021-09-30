import React from 'react';
import App from './App';
import ApolloClient from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory'
import {createHttpLink} from 'apollo-link-http'
import {ApolloProvider} from '@apollo/react-hooks';
import {setContext} from 'apollo-link-context';

const httpLink = createHttpLink({
    // this is just pointing towards our graphql server which is localhost 5000
    uri: 'http://localhost:5000'
})


const authLink = setContext(() => {
    
    const token = localStorage.getItem('jwtToken');

    return{
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})

// with the authLink and concat, it should add the token to the page
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

// this takesa  request but we dont need it this time around


export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)