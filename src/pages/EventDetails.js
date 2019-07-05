import React, { useEffect } from 'react';
import { getEvent, sendInvites as sendInvitesQuery } from '../queries/eventQueries';
import useFetcher from '../hooks/useFetcher';
import { withRouter } from 'react-router';
import errorTypes from '../constants/errorTypes';
import Error from '../components/Error';
import ButtonConfirm from '../components/ButtonConfirm';
import Button, { Buttons } from '../components/Button';
import Tool from '../components/Tool';
import Container from '../components/Container';
import Tools from '../components/Tools';
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
          <Tools>
            <Tool>
              <Button to={`/app`}>Back</Button>
            </Tool>
            <Tool>
              <PageTitle>{name}</PageTitle>
            </Tool>
          </Tools>
          <div className="pink-black">
            <Container>
              <PageTitle>Details</PageTitle>
              <p>
                {host} is having a {type} at {place} on {time}, {date}.
              </p>
              <Buttons>
                <Button to={`${eventId}/edit`}>Edit</Button>
              </Buttons>
            </Container>
          </div>
          <div className="white-blue">
            <Container>
              <PageTitle>Guests</PageTitle>
              <p>No one has accepted yet. Either you haven't hit send or you aren't very popular.</p>
              <Buttons>
                <Button to={`${eventId}/guests`}>Manage guests</Button>
                <Button onClick={sendInvites}>Send invites</Button>
                {errorType === errorTypes.sendInvites && errorMessage && <Error errorMessage={errorMessage} />}
              </Buttons>
            </Container>
          </div>
          <div>
            <Container>
              <PageTitle>Delete event</PageTitle>
              <p>The shows over folks, time to wrap it up.</p>
              <Buttons>
                <ButtonConfirm onConfirm={() => deleteEvent(eventId)}>Delete</ButtonConfirm>
              </Buttons>
            </Container>
          </div>
        </>
      )}
    </div>
  );
};

export default withRouter(EventDetails);
