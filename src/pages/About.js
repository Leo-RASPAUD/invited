import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import useForm from 'react-hook-form';
import useFetcher from '../hooks/useFetcher';
import Container from '../components/Container';
import Button from '../components/Button';
import PageTitle from '../components/PageTitle';
import TextArea from '../components/TextArea';
import getArrayRandomItem from '../utils/getArrayRandomItem';
import Error from '../components/Error';
import Input from '../components/Input';
import { contactUs } from '../queries/eventQueries';

// import { Context } from '../AppContext';
// import { actions } from '../reducers/stylesReducer';

const titles = [
  'Bend',
  'Bended',
  'Bender',
  'Bending',
  'Bends',
  'The bend',
  'The Bending',
  'The bends',
  'Bent',
  'Bents',
  'The bent',
  'The bents',
];

export default () => {
  const { handleSubmit, register, errors, reset } = useForm();
  const [sending, setSending] = useState(false);
  const {
    fetcher,
    state: { errorMessage },
  } = useFetcher();

  const onSubmit = async data => {
    setSending(true);
    let user;
    try {
      user = await Auth.currentAuthenticatedUser();
    } catch (error) {
      // Non authenticated
    }
    const authMode = user ? 'AMAZON_COGNITO_USER_POOLS' : 'AWS_IAM';
    const query = {
      ...contactUs,
      authMode,
      params: data,
    };
    await fetcher(query);
    setSending(false);
    reset();
  };

  // useEffect(() => {
  //   dispatchStyles({ type: actions.updateStyles, payload: { background: '#ff7a64', color: '#ffef6b' } })
  //   return () => {
  //     dispatchStyles({ type: actions.updateStyles, payload: {} })
  //   }
  // }, []); // eslint-disable-line

  return (
    <>
      <div className="yellow-orange" style={{ minHeight: '30vh' }}>
        <Container>
          <PageTitle>{getArrayRandomItem(titles)}</PageTitle>
          <p>We did this.</p>
          <div style={{ display: 'flex', margin: '0 -8px' }}>
            <div style={{ margin: '0 8px', width: '50%' }}>
              <div
                style={{
                  backgroundImage: `url(https://s3-ap-southeast-2.amazonaws.com/invited.public/images/garth.gif)`,
                  backgroundSize: 'cover',
                  paddingTop: '100%',
                  width: '100%',
                }}
              />
              <p>Garth</p>
            </div>
            <div style={{ margin: '0 8px', width: '50%' }}>
              <div
                style={{
                  backgroundImage: `url(https://s3-ap-southeast-2.amazonaws.com/invited.public/images/leo.gif)`,
                  backgroundSize: 'cover',
                  paddingTop: '100%',
                  width: '100%',
                }}
              />
              <p>Léo</p>
            </div>
          </div>
        </Container>
      </div>
      <div className="pink-black" style={{ minHeight: '40vh' }}>
        <Container>
          <PageTitle>Feedback</PageTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input required name="from" label="From" type="text" register={register} errors={errors} />
            <TextArea
              required
              name="content"
              label="Any feedback is welcome, improvements, suggestions or features."
              type="textarea"
              register={register}
              errors={errors}
            />
            {errorMessage && <Error errorMessage={errorMessage} />}
            <Button disabled={sending}>Contact us</Button>
          </form>
        </Container>
      </div>
    </>
  );
};
