import React, { useEffect } from 'react';
import { getEvents } from '../queries/eventQueries';
import useFetcher from '../hooks/useFetcher';
import Container from '../components/Container';
import Grid from '../components/Grid';
import GridItem from '../components/GridItem';
import Item from '../components/Item';
import Button from '../components/Button';
import Tools from '../components/Tools';
import Search from '../components/Search';
import Error from '../components/Error';

export default () => {
  const {
    loading,
    state: { events, errorMessage },
    fetcher,
  } = useFetcher();

  useEffect(() => {
    fetcher(getEvents);
  }, []); // eslint-disable-line

  return (
    <div>
      <Tools>
        <Button to="/app/new">New event</Button>
        <Search name="search" />
      </Tools>
      <Container>
        <h1>My events</h1>
      </Container>
      <div>
        {loading && <div>Loading ...</div>}
        {errorMessage && <Error errorMessage={errorMessage} />}
        {!loading ? (
          <Grid>
            {events.map(event => (
              <GridItem>
                <Item key={event.id} {...event} />
              </GridItem>
            ))}
          </Grid>
          ) : null}
      </div>
    </div>
  );
};
