import React, { useEffect, useState } from 'react';
import useForm from 'react-hook-form';
import { decrypt } from '../queries/guestQueries';
import { updateGuestInvitation } from '../mutations/guestMutations';
import useFetcher from '../hooks/useFetcher';
import { withRouter } from 'react-router';
import stringUtils from '../utils/stringUtils';
import Input from '../components/Input';
import InputCheckbox from '../components/InputCheckbox';
import Error from '../components/Error';
import errorTypes from '../constants/errorTypes';
import Button from '../components/Button';
import Container from '../components/Container';
import MaxWidth from '../components/MaxWidth';
import PageTitle from '../components/PageTitle';

import BackgroundFixed from '../components/BackgroundFixed';
import Wedding from '../templates/Wedding';
import Birthday from '../templates/Birthday';
import Funeral from '../templates/Funeral';
import Drinks from '../templates/Drinks';
import Restaurant from '../templates/Restaurant';
import Party from '../templates/Party';
import eventThemes from '../constants/eventThemes';
import eventTypes from '../constants/eventTypes';

const PublicEvent = ({ location, match }) => {
  const encrypted = match.params.encrypted;
  const { loading, state, fetcher } = useFetcher();
  const { handleSubmit, register, errors } = useForm();
  const [accepted, setAccepted] = useState(false);

  const {
    guest,
    errorType,
    errorMessage,
    event,
    event: { type },
  } = state;

  const isAccept = location.search.match(/accept=(.*)/) ? location.search.match(/accept=(.*)/)[1] === 'true' : false;

  const onSubmit = async data => {
    const copy = stringUtils.removeEmptyValues(data);
    await fetcher({
      ...updateGuestInvitation,
      params: { ...guest, ...copy, accepted: data.accepted === 'on' ? true : false },
    });
    setAccepted(true);
  };

  useEffect(() => {
    fetcher({ ...decrypt, params: { encrypted } });
  }, []); // eslint-disable-line

  const styles = type
    ? {
        ...eventThemes[type],
        minHeight: 'calc(100vh - 84px)',
      }
    : {
        minHeight: 'calc(100vh - 84px)',
      };

  if (accepted) {
    return (
      <div style={styles}>
        <Container>
          <PageTitle>Thank you!</PageTitle>
          <p>Have a nice day.</p>
        </Container>
      </div>
    );
  }

  return (
    <div style={styles}>
      {errorType === errorTypes.decrypt && <Error errorMessage={errorMessage} />}
      {!loading && (!errorType || errorType !== errorTypes.decrypt) && (
        <Container>
          <BackgroundFixed image={'backgroundImage'}>
            {eventTypes.wedding === eventTypes[type] && <Wedding {...event} />}
            {eventTypes.birthday === eventTypes[type] && <Birthday {...event} />}
            {eventTypes.funeral === eventTypes[type] && <Funeral {...event} />}
            {eventTypes.drinks === eventTypes[type] && <Drinks {...event} />}
            {eventTypes.restaurant === eventTypes[type] && <Restaurant {...event} />}
            {eventTypes.party === eventTypes[type] && <Party {...event} />}
          </BackgroundFixed>
          <PageTitle>Accept</PageTitle>
          <MaxWidth>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input name="notes" label="Notes" type="text" register={register} errors={errors} />
              <InputCheckbox
                name="accepted"
                label="Accepted"
                type="checkbox"
                register={register}
                errors={errors}
                defaultChecked={isAccept}
              />
              {errorType === errorTypes.updateGuestInvitation && errorMessage && <Error errorMessage={errorMessage} />}
              <Button type="submit">Submit</Button>
            </form>
          </MaxWidth>
        </Container>
      )}
    </div>
  );
};

export default withRouter(PublicEvent);
