import React, { useEffect, useState } from 'react';
import useForm from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { decrypt } from '../queries/guestQueries';
import { updateGuestInvitation } from '../mutations/guestMutations';
import useFetcher from '../hooks/useFetcher';
import { withRouter } from 'react-router';
import stringUtils from '../utils/stringUtils';
import Input from '../components/Input';
import InputCheckbox from '../components/InputCheckbox';
import Error from '../components/Error';
import errorTypes from '../constants/errorTypes';
import Brand from '../components/Brand';
import Button from '../components/Button';
import Container from '../components/Container';
import MaxWidth from '../components/MaxWidth';
import PageTitle from '../components/PageTitle';
import BackgroundFixed from '../components/BackgroundFixed';
import Wedding from '../templates/Wedding';
import Birthday from '../templates/Birthday';
import Drinks from '../templates/Drinks';
import Dinner from '../templates/Dinner';
import Party from '../templates/Party';
import eventThemes from '../constants/eventThemes';
import eventTypes from '../constants/eventTypes';
import Select from '../components/Select';

const Public = ({ location, match }) => {
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

  const loadData = async () => {
    let user;
    try {
      user = await Auth.currentAuthenticatedUser();
    } catch (error) {
      // Non authenticated
    }
    const authMode = user ? 'AMAZON_COGNITO_USER_POOLS' : 'AWS_IAM';
    const query = {
      ...decrypt,
      authMode,
    };
    // authMode: 'AMAZON_COGNITO_USER_POOLS',
    fetcher({ ...query, params: { encrypted } });
  };

  useEffect(() => {
    loadData();
  }, []); // eslint-disable-line

  const styles = type
    ? {
        ...eventThemes[type],
        boxSizing: 'border-box',
        minHeight: '100vh',
        padding: '84px 0 0',
        position: 'relative',
        transition: 'background .2s ease-in-out',
      }
    : {
        boxSizing: 'border-box',
        minHeight: '100vh',
        padding: '84px 0 0',
        position: 'relative',
        transition: 'background .2s ease-in-out',
      };

  const brandStyles = {
    left: 16,
    position: 'absolute',
    top: 16,
  };

  return (
    <div style={styles}>
      <Brand style={brandStyles} to="/">
        Invited
      </Brand>
      {errorType === errorTypes.decrypt && <Error errorMessage={errorMessage} />}
      {!loading && (!errorType || errorType !== errorTypes.decrypt) && (
        <Container>
          <BackgroundFixed image={'backgroundImage'}>
            {eventTypes.wedding === eventTypes[type] && <Wedding {...event} />}
            {eventTypes.birthday === eventTypes[type] && <Birthday {...event} />}
            {eventTypes.drinks === eventTypes[type] && <Drinks {...event} />}
            {eventTypes.dinner === eventTypes[type] && <Dinner {...event} />}
            {eventTypes.party === eventTypes[type] && <Party {...event} />}
          </BackgroundFixed>
          {!accepted ? (
            <>
              <PageTitle h={2}>Accept</PageTitle>
              <MaxWidth>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Input name="notes" label="Notes" type="text" register={register} errors={errors} />
                  <InputCheckbox
                    name="accepted"
                    label="I'm going"
                    type="radio"
                    register={register}
                    errors={errors}
                    defaultChecked={isAccept}
                  />
                  <InputCheckbox
                    name="accepted"
                    label="Sorry I can't"
                    type="radio"
                    register={register}
                    errors={errors}
                    defaultChecked={!isAccept}
                  />
                  <Select
                    label="How many people coming?"
                    register={register}
                    errors={errors}
                    name="participants"
                    required
                    defaultValue={1}
                  >
                    <option value="">Select</option>
                    {Array.from(new Array(10), (_, index) => index).map(index => (
                      <option key={index} value={index}>
                        {index}
                      </option>
                    ))}
                  </Select>
                  {errorType === errorTypes.updateGuestInvitation && errorMessage && (
                    <Error errorMessage={errorMessage} />
                  )}
                  <Button type="submit">Submit</Button>
                </form>
              </MaxWidth>
            </>
          ) : (
            <>
              <PageTitle>Thank you!</PageTitle>
              <p>Have a nice day.</p>
            </>
          )}
        </Container>
      )}
    </div>
  );
};

export default withRouter(Public);
