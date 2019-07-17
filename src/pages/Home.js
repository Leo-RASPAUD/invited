import React from 'react';
import Container from '../components/Container';
import PageTitle from '../components/PageTitle';

export default () => (
  <>
    <div className="white-blue" style={{ minHeight: '30vh' }}>
      <Container>
        <PageTitle>Hi, I'm Invited.</PageTitle>
        <p>I'm a simple web application for organising events.</p>
      </Container>
    </div>
    <div className="yellow-teal" style={{ minHeight: '30vh' }}>
      <Container>
        <PageTitle>How does this work?</PageTitle>
        <p>
          Create an account. Create an event. Invite guests. Send invitations. Guests get a link and can accept or
          decline the invitation. Review attendees. Easy.
        </p>
      </Container>
    </div>
    <div className="pink-black" style={{ minHeight: '30vh' }}>
      <Container>
        <PageTitle>P.S.</PageTitle>
        <p>
          We are currently in <strong>beta</strong> so things may change, break or not work as expected.
        </p>
      </Container>
    </div>
  </>
);
