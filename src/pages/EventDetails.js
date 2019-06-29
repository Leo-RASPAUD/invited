import React, { useEffect } from 'react';
import { getEvent, sendInvites as sendInvitesQuery } from '../queries/eventQueries';
import useFetcher from '../hooks/useFetcher';
import { withRouter } from 'react-router';
import errorTypes from '../constants/errorTypes';
import Error from '../components/Error';
import ButtonConfirm from '../components/ButtonConfirm';
import Button from '../components/Button';
import Container from '../components/Container';
import Tool from '../components/Tool';
import Tools from '../components/Tools';
import Invitation from '../components/Invitation';
import { deleteEvent as deleteEventMutation } from '../mutations/eventMutations';

import PageTitle from '../components/PageTitle';
const EventDetails = ({ history, location, match }) => {
  const eventId = match.params.id;
  const { loading, state, fetcher } = useFetcher();
  const {
    event: { date, host, name, place, time, type },
    guests = [],
    errorMessage,
    errorType,
  } = state;

  const deleteEvent = async id => {
    await fetcher({ ...deleteEventMutation, params: { id } });
    history.push(`/app`);
  };

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
        <>
          <Container>
            <PageTitle>{name}</PageTitle>
          </Container>
          <Tools>
            <Tool>
              <Button to={`${eventId}/guests`}>Guests</Button>
            </Tool>
            <Tool>
              <Button onClick={sendInvites}>Send</Button>
            </Tool>
            <Tool>
              <ButtonConfirm onConfirm={() => deleteEvent(eventId)}>Delete</ButtonConfirm>
            </Tool>
          </Tools>
          <Invitation type={type}>
            <h1>The {type} of</h1>
            <p>{host}</p>
            <p>please join us</p>
            <p>
              {date}, {time}
            </p>
            <p>{place}</p>
            <p>Reception to follow</p>
          </Invitation>
          {errorType === errorTypes.sendInvites && errorMessage && <Error errorMessage={errorMessage} />}
        </>
      )}
    </div>
  );
};

export default withRouter(EventDetails);
