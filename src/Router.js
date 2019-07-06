import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import DesktopNavigation from './components/DesktopNavigation';
import Create from './pages/Create';
import EditEvent from './pages/EditEvent';
import EventDetails from './pages/EventDetails';
import EventGuests from './pages/EventGuests';
import EventList from './pages/EventList';
import ForgotPassword from './pages/ForgotPassword';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import HubAuth from './components/HubAuth';
import Profile from './pages/Profile';
import PublicEvent from './pages/PublicEvent';
import SignUp from './pages/SignUp';
import spring from 'react-motion/lib/spring';

import styles from './Router.module.scss';

export default () => {
  function glide(val) {
    return spring(val, {
      stiffness: 174,
      damping: 19,
    });
  }

  const pageTransitions = {
    atEnter: {
      offset: 200,
      opacity: 0,
    },
    atLeave: {
      offset: glide(-100),
      opacity: 0,
    },
    atActive: {
      offset: glide(0),
      opacity: glide(1),
    },
  };
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
        <AnimatedSwitch
          {...pageTransitions}
          className={styles['switch-wrapper']}
          mapStyles={styles => ({
            opacity: 1,
            transform: `translateX(${styles.offset}%)`,
          })}
        >
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
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
        </AnimatedSwitch>
      </Main>
    </Router>
  );
};
