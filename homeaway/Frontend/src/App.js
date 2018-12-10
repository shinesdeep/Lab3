import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter} from 'react-router-dom';
import './App.css';

import Main from './Components/Main';

const client = new ApolloClient({
  uri : 'http://localhost:3001/graphql'
})

class App extends Component { 
  render() {
    return (
      <BrowserRouter>
       <ApolloProvider client={client}>
        <div>
          {/* App Component Has a Child Component called Main*/}
          <Main/>
        </div>
        </ApolloProvider>
      </BrowserRouter>
    );
  }
}

export default App;
