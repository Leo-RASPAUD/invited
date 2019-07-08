import React from 'react';
import Container from '../components/Container';
import PageTitle from '../components/PageTitle';
import getArrayRandomItem from '../utils/getArrayRandomItem';

import garth from '../assets/garth.gif';
import leo from '../assets/leo.gif';

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
  'Bent',
  'Bents',
  'The bent',
  'The bents',
];

export default () => (
  <div className="yellow-orange" style={{ minHeight: '30vh' }}>
    <Container>
      <PageTitle>{getArrayRandomItem(titles)}</PageTitle>
      <p>We did this.</p>
      <div style={{ display: 'flex', margin: '0 -8px' }}>
        <div style={{ margin: '0 8px', width: '50%' }}>
          <div
            style={{ backgroundImage: `url(${garth})`, backgroundSize: 'cover', paddingTop: '100%', width: '100%' }}
          />
          <p>Garth</p>
        </div>
        <div style={{ margin: '0 8px', width: '50%' }}>
          <div style={{ backgroundImage: `url(${leo})`, backgroundSize: 'cover', paddingTop: '100%', width: '100%' }} />
          <p>Léo</p>
        </div>
      </div>
    </Container>
  </div>
);
