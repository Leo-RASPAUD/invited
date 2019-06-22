import React, { useEffect } from 'react';
import { getEvent, sendInvites as sendInvitesQuery } from '../queries/eventQueries';
import useFetcher from '../hooks/useFetcher';
import { withRouter } from 'react-router';
import errorTypes from '../constants/errorTypes';
import Error from '../components/Error';
import Button, { Buttons } from '../components/Button';
import Container from '../components/Container';

import PageTitle from '../components/PageTitle';
const EventDetails = ({ location, match }) => {
  const eventId = match.params.id;
  const { loading, state, fetcher } = useFetcher();
  const {
    event: { name, type, place, date, host },
    guests = [],
    errorMessage,
    errorType,
  } = state;

  const sendInvites = () => {
    fetcher({
      ...sendInvitesQuery,
      params: { name, type, place, date, host, guests: JSON.stringify(guests) },
    });
  };

  useEffect(() => {
    fetcher({ ...getEvent, params: { id: eventId } });
  }, []); // eslint-disable-line

  return (
    <div>
      {errorType === errorTypes.getEvent && <Error errorMessage={errorMessage} />}
      {!loading && (!errorType || errorType !== errorTypes.getEvent) && (
        <Container>
          <PageTitle>{name}</PageTitle>
          <div>Insert example of invitation.</div>
          <div>Type: {type}</div>
          <div>Place: {place}</div>
          <div>Date: {date}</div>
          <div>Host: {host}</div>
          <Buttons>
            <Button to={`${eventId}/guests`}>Event guests</Button>
          </Buttons>
          <h3>Send</h3>
          <Button onClick={sendInvites}>Send invites</Button>
          {errorType === errorTypes.sendInvites && errorMessage && <Error errorMessage={errorMessage} />}
          {/* <h3>Add guest</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input required name="firstName" label="First name" type="text" register={register} errors={errors} />
            <Input required name="lastName" label="Last name" type="text" register={register} errors={errors} />
            <Input required name="email" label="Email" type="text" register={register} errors={errors} />
            {errorType === errorTypes.addGuest && errorMessage && <Error errorMessage={errorMessage} />}
            <input className="button" type="submit" />
          </form> */}
        </Container>
      )}
    </div>
  );
};

export default withRouter(EventDetails);
