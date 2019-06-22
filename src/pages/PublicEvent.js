import React, { useEffect } from 'react';
import useForm from 'react-hook-form';
import { decrypt } from '../queries/guestQueries';
import { updateGuestInvitation } from '../mutations/guestMutations';
import useFetcher from '../hooks/useFetcher';
import { withRouter } from 'react-router';
import stringUtils from '../utils/stringUtils';
import Input from '../components/Input';
import Error from '../components/Error';
import errorTypes from '../constants/errorTypes';

const PublicEvent = ({ location, match }) => {
  const encrypted = match.params.encrypted;
  const { loading, state, fetcher } = useFetcher();
  const { handleSubmit, register, errors } = useForm();

  const {
    guest,
    errorType,
    errorMessage,
    guest: { firstName, lastName, email, eventId },
    event: { name, host, type, place, date },
  } = state;

  const onSubmit = async data => {
    const copy = stringUtils.removeEmptyValues(data);
    fetcher({
      ...updateGuestInvitation,
      params: { ...guest, ...copy, accepted: data.accepted === 'on' ? true : false },
    });
  };

  useEffect(() => {
    fetcher({ ...decrypt, params: { encrypted } });
  }, []); // eslint-disable-line
  console.log(state);

  return (
    <div>
      {errorType === errorTypes.decrypt && <Error errorMessage={errorMessage} />}
      {!loading && (!errorType || errorType !== errorTypes.decrypt) && (
        <>
          <h1>{firstName} you're invited to the following event:</h1>
          <div>
            {firstName} {lastName} {email}
          </div>
          <div style={{ fontSize: 32, color: 'purple', backgroundColor: 'coral' }}>{name}</div>
          <div>Id: {eventId}</div>
          <div>Type: {type}</div>
          <div>Place: {place}</div>
          <div>Date: {date}</div>
          <div>Host: {host}</div>
          <h3>Accept</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input required name="notes" label="Notes" type="text" register={register} errors={errors} />
            <Input name="accepted" label="Accepted" type="checkbox" register={register} errors={errors} />
            {errorType === errorTypes.updateGuestInvitation && errorMessage && <Error errorMessage={errorMessage} />}
            <input type="submit" className="button" />
          </form>
        </>
      )}
    </div>
  );
};

export default withRouter(PublicEvent);
