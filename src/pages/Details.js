import React, { useEffect, useState } from 'react';
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
  const [sendingInvites, setSendingInvites] = useState(false);
  const { loading, state, fetcher } = useFetcher();
  const {
    event: { date, host, name, place, time, type, details },
    guests = [],
    errorMessage,
    errorType,
  } = state;

  const acceptedCount = guests.filter(guest => guest.accepted).length;

  const deleteEvent = async id => {
    await fetcher({ ...deleteEventMutation, params: { id } });
    history.push(`/my/events`);
  };

  const sendInvites = async () => {
    console.log(time);
    setSendingInvites(true);
    await fetcher({
      ...sendInvitesQuery,
      params: { eventId, name, type, place, date, host, time, guests: JSON.stringify(guests), details },
    });
    setSendingInvites(false);
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
            <Tools>
              <Tool>
                <Button to={`/my/events`}>Back</Button>
              </Tool>
            </Tools>
          </Container>
          <div className="pink-black">
            <Container>
              <PageTitle>Summary</PageTitle>
              <p>
                {host} is having {type !== 'drinks' && 'a'} {type} at {place}. {time}, {date}.
              </p>
              <Buttons>
                <Button to={`${eventId}/edit`}>Edit</Button>
              </Buttons>
            </Container>
          </div>
          <div className="orange-yellow">
            <Container>
              <PageTitle>Details</PageTitle>
              <p>{details}</p>
            </Container>
          </div>
          <div className="white-blue">
            <Container>
              <PageTitle>Guests</PageTitle>
              {acceptedCount === 0 && (
                <p>No one has accepted yet. Either you haven't hit send or you aren't very popular.</p>
              )}
              {acceptedCount > 0 && (
                <p>
                  {acceptedCount} {acceptedCount === 1 ? 'person has' : 'peeps have'} accepted so far!
                </p>
              )}
              <Buttons>
                <Button to={`${eventId}/guests`}>Manage</Button>
                <Button disabled={sendingInvites} onClick={sendInvites}>
                  Send invites
                </Button>
              </Buttons>
              {errorType === errorTypes.sendInvites && errorMessage && <Error errorMessage={errorMessage} />}
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
