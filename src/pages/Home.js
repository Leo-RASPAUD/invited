import React from 'react';
import Container from '../components/Container';
import PageTitle from '../components/PageTitle';
import Paragraph from '../components/Paragraph';
import List from '../components/List';

import party from '../graphics/party.svg';
import phone from '../graphics/phone.svg';

export default () => (
  <>
    <div className="white-blue" style={{ minHeight: '30vh' }}>
      <Container>
        <PageTitle>Hi, I'm Invited.</PageTitle>
        <Paragraph>I'm a simple web application for organising events.</Paragraph>
        <div
          style={{
            maxWidth: 480,
            width: '100%',
          }}
        >
          <div
            style={{
              backgroundImage: `url(${phone})`,
              backgroundSize: 'cover',
              paddingTop: '100%',
              width: '100%',
            }}
          />
        </div>
      </Container>
    </div>
    <div className="yellow-teal" style={{ minHeight: '30vh' }}>
      <Container>
        <PageTitle>How does this work?</PageTitle>
        <List>
          {[
            'Create an account.',
            'Create an event.',
            'Invite guests.',
            'Send invitations.',
            'Guests get a link and can accept or decline the invitation.',
            'Review attendees.',
            'Easy.',
          ]}
        </List>
      </Container>
    </div>
    <div className="pink-black" style={{ minHeight: '30vh' }}>
      <Container>
        <PageTitle>P.S.</PageTitle>
        <Paragraph>
          We are <strong>live</strong>.
        </Paragraph>
        <div
          style={{
            maxWidth: 480,
            width: '100%',
          }}
        >
          <div
            style={{
              backgroundImage: `url(${party})`,
              backgroundSize: 'cover',
              paddingTop: '100%',
              width: '100%',
            }}
          />
        </div>
      </Container>
    </div>
  </>
);
