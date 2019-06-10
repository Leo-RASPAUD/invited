import React, { useState, useEffect } from 'react'; // eslint-disable-line
import { Auth } from 'aws-amplify';

export default () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    const user = await Auth.currentAuthenticatedUser();
    setUser(user);
    setLoading(false);
  };

  useEffect(() => {
    getUser(Auth.currentAuthenticatedUser);
  }, []);

  return [loading, user];
};
