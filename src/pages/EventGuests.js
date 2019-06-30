import React, { useEffect } from 'react';
import useForm from 'react-hook-form';
import useFetcher from '../hooks/useFetcher';
import Button from '../components/Button';
import Container from '../components/Container';
import Grid from '../components/Grid';
import GridItem from '../components/GridItem';
import Input from '../components/Input';
import Error from '../components/Error';
import Guest from '../components/Guest';
import stringUtils from '../utils/stringUtils';
import PageTitle from '../components/PageTitle';
import { getGuests } from '../queries/guestQueries';
import { addGuest } from '../mutations/guestMutations';
import Tool from '../components/Tool';
import Tools from '../components/Tools';
import errorTypes from '../constants/errorTypes';

export default ({ match }) => {
  const eventId = match.params.id;
  const { loading, state, fetcher } = useFetcher();
  const { handleSubmit, register, errors } = useForm();
  const { guests = [], errorMessage, errorType } = state;

  const onSubmit = async data => {
    const copy = stringUtils.removeEmptyValues(data);
    await fetcher({ ...addGuest, params: { ...copy, eventId } });
  };

  useEffect(() => {
    fetcher({ ...getGuests, params: { eventId } });
  }, []); // eslint-disable-line

  return (
    <div>
      {(errorType === errorTypes.getGuests || errorType === errorTypes.deleteGuest) && errorMessage && (
        <Error errorMessage={errorMessage} />
      )}
      {(!errorType || errorType !== errorTypes.getGuests) && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Tools>
            <Tool>
              <Button to={`/app/event/${eventId}`}>&#x2190; Event</Button>
            </Tool>
          </Tools>
          <Container>
            <PageTitle>Add a new guest</PageTitle>
          </Container>
          <Container>
            <Grid>
              <GridItem>
                <Input required name="firstName" label="First name" type="text" register={register} errors={errors} />
                <Input required name="lastName" label="Last name" type="text" register={register} errors={errors} />
                <Input required name="email" label="Email" type="text" register={register} errors={errors} />
                {errorType === errorTypes.addGuest && errorMessage && <Error errorMessage={errorMessage} />}
              </GridItem>
            </Grid>
          </Container>
          <Tools>
            <Tool>
              <Button type="submit">Add guest</Button>
            </Tool>
          </Tools>
        </form>
      )}
      {loading ? 'Loading...' : null}
      {!loading && guests.length > 0 && (
        <>
          <Container>
            <PageTitle>Guests</PageTitle>
          </Container>
          <Container>
            <Grid>
              {guests.map(guest => {
                return (
                  <GridItem key={guest.id}>
                    <Guest {...guest} />
                  </GridItem>
                );
              })}
            </Grid>
          </Container>
        </>
      )}
    </div>
  );
};
