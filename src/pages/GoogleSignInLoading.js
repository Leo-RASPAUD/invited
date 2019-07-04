import React, { useEffect, useContext } from 'react'; // eslint-disable-line
import context from '../UserContext';

export default ({ history }) => {
  const userContext = useContext(context);
  useEffect(() => {
    const isAuthenticated = userContext.user && userContext.user.username ? true : false;
    if (isAuthenticated) {
      history.push('/app');
    }
  });
  return null;
};
