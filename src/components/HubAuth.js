import React, { useEffect, useContext } from 'react'; // eslint-disable-line
import { Hub } from 'aws-amplify';
import { withRouter } from 'react-router-dom';
import UserContext from '../UserContext';

const HubAuth = ({ history }) => {
  const { updateCurrentUser } = useContext(UserContext);

  const hubAuthCallback = async ({ channel, payload: { event, data } }) => {
    if (event === 'signIn') {
      await updateCurrentUser(data);
      history.push('/app');
    }
    if (event === 'signOut') {
      await updateCurrentUser(null);
      history.push('/');
    }
  };

  useEffect(() => {
    Hub.listen('auth', hubAuthCallback);
    return () => {
      Hub.remove('auth');
    };
  });

  return null;
};

export default withRouter(HubAuth);
