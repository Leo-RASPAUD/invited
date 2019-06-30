import React, { useEffect } from 'react';
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
import eventTypes from '../constants/eventTypes';
import Grid from '../components/Grid';
import GridItem from '../components/GridItem';
import PageTitle from '../components/PageTitle';

const PublicEvent = ({ location, match }) => {
  const encrypted = match.params.encrypted;
  const { loading, state, fetcher } = useFetcher();
  const { handleSubmit, register, errors } = useForm();

  const {
    guest,
    errorType,
    errorMessage,
    event: { host, type, place, date, time },
  } = state;

  const isAccept = location.search.match(/accept=(.*)/) ? location.search.match(/accept=(.*)/)[1] === 'true' : false;

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

  return (
    <div>
      {errorType === errorTypes.decrypt && <Error errorMessage={errorMessage} />}
      {!loading && (!errorType || errorType !== errorTypes.decrypt) && (
        <>
          <Invitation type={type}>
            <h1>The {eventTypes[type]} of</h1>
            <p>{host}</p>
            <p>please join us</p>
            <p>
              {date}, {time}
            </p>
            <p>{place}</p>
            <p>Reception to follow</p>
          </Invitation>
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
        </>
      )}
    </div>
  );
};

export default withRouter(PublicEvent);
