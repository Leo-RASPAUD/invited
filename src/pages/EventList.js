import React, { useEffect } from 'react';
import useForm from 'react-hook-form';
import { getEvents } from '../queries/eventQueries';
import useFetcher from '../hooks/useFetcher';
import Container from '../components/Container';
import Grid from '../components/Grid';
import GridItem from '../components/GridItem';
import Event from '../components/Event';
import Button from '../components/Button';
import PageTitle from '../components/PageTitle';
import Tool from '../components/Tool';
import Tools from '../components/Tools';
// import Event from '../components/Event';
import Search from '../components/Search';
import Error from '../components/Error';
import IconText from '../components/IconText';
import { MdCreate } from 'react-icons/md';

export default () => {
  const {
    loading,
    state: { events, errorMessage },
    fetcher,
  } = useFetcher();
  const { register, watch } = useForm();
  const watchSearch = watch('search');

  useEffect(() => {
    fetcher(getEvents);
  }, []); // eslint-disable-line

  return (
    <>
      <Container>
        <PageTitle>Events</PageTitle>
      </Container>
      <Tools>
        <Tool>
          <Button to="/app/new">
            <IconText icon={MdCreate}>New</IconText>
          </Button>
        </Tool>
        <Tool>
          <Search name="search" register={register} />
        </Tool>
      </Tools>
      <Container>
        {errorMessage && <Error errorMessage={errorMessage} />}
        {!loading ? (
          <Grid>
            {events
              .filter(event => event.name.toLowerCase().startsWith(watchSearch.toLowerCase()))
              .map(event => (
                <GridItem key={event.id}>
                  <Event {...event} />
                </GridItem>
              ))}
          </Grid>
        ) : null}
      </Container>
    </>
  );
};
