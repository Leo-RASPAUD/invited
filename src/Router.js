import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import DesktopNavigation from './components/DesktopNavigation';
import Create from './pages/Create';
import EditEvent from './pages/EditEvent';
import EventDetails from './pages/EventDetails';
import EventGuests from './pages/EventGuests';
import EventList from './pages/EventList';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import HubAuth from './components/HubAuth';
import Profile from './pages/Profile';
import PublicEvent from './pages/PublicEvent';
import SignUp from './pages/SignUp';

export default () => {
  return (
    <Router>
      <HubAuth />
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
          <Route exact path="/" component={Home} />
          <Route exact path="/event/:encrypted" component={PublicEvent} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/googleSignIn" render={() => null} />
          <Route exact path="/forgotPassword" component={ForgotPassword} />
          <PrivateRoute exact path="/app" component={EventList} />
          <PrivateRoute exact path="/app/new" component={Create} />
          <PrivateRoute exact path="/app/profile" component={Profile} />
          <PrivateRoute exact path="/app/event/:id" component={EventDetails} />
          <PrivateRoute exact path="/app/event/:id/edit" component={EditEvent} />
          <PrivateRoute exact path="/app/event/:id/guests" component={EventGuests} />
        </Switch>
      </Main>
      <Footer />
    </Router>
  );
};
