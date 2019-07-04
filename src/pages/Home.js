import React from 'react';
import Container from '../components/Container';
import PageTitle from '../components/PageTitle';

export default () => (
  <>
    <div className="white-blue">
      <Container>
        <PageTitle>Hi, I'm Invited.</PageTitle>
        <p>I'm a simple web application for organising events.</p>
      </Container>
    </div>
    <div className="yellow-orange">
      <Container>
        <PageTitle>'How does this work?' I hear you ask.</PageTitle>
        <p>
          Create an account. Create an event. Invite guests. Send invitations (by email). Guests get a link and can
          Accept or decline the invitation. You can review attendees and send out any updates if required. Easy.
        </p>
      </Container>
    </div>
    <div className="pink-black">
      <Container>
        <PageTitle>P.S.</PageTitle>
        <p>
          We are currently in <strong>alpha</strong> so things may change, break or not work as expected.
        </p>
        <p>
          Be patient. Be kind. Good things come to those who wait. Shouldn't be long until we are cracking some bottles
          at the invited <strong>launch party</strong>. although chances are you're not invited ;)
        </p>
      </Container>
    </div>
  </>
);
