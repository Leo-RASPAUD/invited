import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import Container from '../components/Container';
import PageTitle from '../components/PageTitle';
import Profile from '../components/Profile';

export default () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const getSession = async () => {
    const auth = await Auth.currentSession();
    setUser(auth.accessToken.payload);
    setLoading(false);
  };

  useEffect(() => {
    getSession();
  }, []); // eslint-disable-line

  return loading ? null : (
    <>
      <Container>
        <PageTitle>Profile</PageTitle>
      </Container>
      <Profile user={user} />
    </>
  );
};
