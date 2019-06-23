import React, { useEffect } from 'react';
import { getEvents } from '../queries/eventQueries';
import useFetcher from '../hooks/useFetcher';
import Container from '../components/Container';
import Grid from '../components/Grid';
import GridItem from '../components/GridItem';
import Item from '../components/Item';
import Button from '../components/Button';
import PageTitle from '../components/PageTitle';
import Tool from '../components/Tool';
import Tools from '../components/Tools';
// import Event from '../components/Event';
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
      <Container>
        <PageTitle>My events</PageTitle>
      </Container>
      <Tools>
        <Tool>
          <Button to="/app/new">New event</Button>
        </Tool>
        <Tool>
          <Search name="search" />
        </Tool>
      </Tools>
      <Container>
        {loading && <div>...</div>}
        {errorMessage && <Error errorMessage={errorMessage} />}
        {!loading ? (
          <Grid>
            {events.map(event => (
              <GridItem key={event.id}>
                <Item {...event} />
              </GridItem>
            ))}
          </Grid>
        ) : null}
      </Container>
    </div>
  );
};
