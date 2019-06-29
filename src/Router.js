import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import DesktopNavigation from './components/DesktopNavigation';
import Create from './pages/Create';
import EventList from './pages/EventList';
import EventDetails from './pages/EventDetails';
import PublicEvent from './pages/PublicEvent';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import EventGuests from './pages/EventGuests';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';

export default () => {
  return (
    <Router>
      <div>
        <Header>
          <Sidebar>
            <Navigation />
          </Sidebar>
          <DesktopNavigation>
            <Navigation />
          </DesktopNavigation>
        </Header>
        <Main>
          <Switch>
            <Route
              exact
              path="/"
              component={() => {
                return <div style={{ padding: 8 }}>Home page</div>;
              }}
            />
            <Route exact path="/event/:encrypted" component={PublicEvent} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <PrivateRoute exact path="/app" component={EventList} />
            <PrivateRoute exact path="/app/new" component={Create} />
            <PrivateRoute exact path="/app/profile" component={Profile} />
            <PrivateRoute exact path="/app/event/:id" component={EventDetails} />
            <PrivateRoute exact path="/app/event/:id/guests" component={EventGuests} />
          </Switch>
        </Main>
      </div>
    </Router>
  );
};
