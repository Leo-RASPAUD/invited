import React, { useEffect } from 'react';
import useFetcher from '../hooks/useFetcher';
import Container from '../components/Container';
import PageTitle from '../components/PageTitle';
import { getGuests } from '../queries/guestQueries';

export default ({ match }) => {
  const eventId = match.params.id;
  const { loading, state, fetcher } = useFetcher();
  const { guests = [] } = state;

  useEffect(() => {
    fetcher({ ...getGuests, params: { eventId } });
  }, []); // eslint-disable-line
  return (
    <div>
      <Container>
        <PageTitle>Guests</PageTitle>
        {loading ? 'Loading...' : null}
        {guests.map(guest => {
          return <div key={guest.id}>{guest.email}</div>;
        })}
      </Container>
    </div>
  );
};
