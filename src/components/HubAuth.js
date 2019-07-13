import React, { useEffect, useContext } from 'react'; // eslint-disable-line
import { Hub, Auth } from 'aws-amplify';
import { withRouter } from 'react-router-dom';
import UserContext from '../UserContext';

const HubAuth = ({ history }) => {
  const { updateCurrentUser } = useContext(UserContext);

  const hubAuthCallback = async ({ channel, payload: { event, data } }) => {
    if (event === 'signIn') {
      const user = await Auth.currentAuthenticatedUser();
      window.FS.identify(user.attributes.sub, {
        displayName: user.attributes.email,
        email: user.attributes.email,
        reviewsWritten_int: 14,
      });
    }

    if (['signIn', 'cognitoHostedUI'].includes(event)) {
      await updateCurrentUser(data);
      history.push('/my/events');
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
  }, []); // eslint-disable-line

  return null;
};

export default withRouter(HubAuth);
