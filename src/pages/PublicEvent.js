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
import Invitation from '../components/Invitation';
import Grid from '../components/Grid';
import GridItem from '../components/GridItem';
import PageTitle from '../components/PageTitle';

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

  console.log(event);
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

  if (accepted) {
    return <div>Thank you!</div>;
  }

  return (
    <div>
      {errorType === errorTypes.decrypt && <Error errorMessage={errorMessage} />}
      {!loading && (!errorType || errorType !== errorTypes.decrypt) && (
        <>
          <Container>
            <PageTitle>Accept</PageTitle>
          </Container>
          <Container>
            <Grid>
              <GridItem>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Input required name="notes" label="Notes" type="text" register={register} errors={errors} />
                  <InputCheckbox
                    name="accepted"
                    label="Accepted"
                    type="checkbox"
                    register={register}
                    errors={errors}
                    defaultChecked={isAccept}
                  />
                  {errorType === errorTypes.updateGuestInvitation && errorMessage && (
                    <Error errorMessage={errorMessage} />
                  )}
                  <Button type="submit">Submit</Button>
                </form>
              </GridItem>
            </Grid>
          </Container>
          <Invitation type={type} event={event} />
        </>
      )}
    </div>
  );
};

export default withRouter(PublicEvent);
