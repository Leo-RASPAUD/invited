import React, { useReducer } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import config from './config';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Create from './pages/Create';
import { Context, initialState } from './AppContext';
import { reducer as eventReducer } from './reducers/eventReducer';

import './App.css';

Amplify.configure(config);

function App() {
  const [state, dispatchEvents] = useReducer(eventReducer, initialState);

  return (
    <div className="App">
      <Context.Provider value={{ state, dispatchEvents }}>
        <Router>
          <Navigation />
          <Route exact path="/" component={Home} />
          <Route exact path="/new" component={Create} />
        </Router>
      </Context.Provider>
    </div>
  );
}

export default withAuthenticator(App);
