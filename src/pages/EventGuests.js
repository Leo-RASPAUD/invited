import React, { useEffect } from 'react';
import useForm from 'react-hook-form';
import useFetcher from '../hooks/useFetcher';
import Button from '../components/Button';
import Container from '../components/Container';
import Grid from '../components/Grid';
import GridItem from '../components/GridItem';
import MaxWidth from '../components/MaxWidth';
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
        <>
          <Container>
            <PageTitle>Manage guests</PageTitle>
            <Tools>
              <Tool>
                <Button to={`/app/event/${eventId}`}>Back</Button>
              </Tool>
            </Tools>
          </Container>
          <div className="pink-black">
            <Container>
              <form onSubmit={handleSubmit(onSubmit)}>
                <PageTitle>Add guest</PageTitle>
                <MaxWidth>
                  <Input required name="firstName" label="First name" type="text" register={register} errors={errors} />
                  <Input required name="lastName" label="Last name" type="text" register={register} errors={errors} />
                  <Input required name="email" label="Email" type="text" register={register} errors={errors} />
                  {errorType === errorTypes.addGuest && errorMessage && <Error errorMessage={errorMessage} />}
                </MaxWidth>
                <Tools>
                  <Tool>
                    <Button type="submit">Add guest</Button>
                  </Tool>
                </Tools>
              </form>
            </Container>
          </div>
        </>
      )}
      {!loading && guests.length > 0 && (
        <>
          <Container>
            <PageTitle>Guests</PageTitle>
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
