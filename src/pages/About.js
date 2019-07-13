import React from 'react';
import Container from '../components/Container';
import PageTitle from '../components/PageTitle';
import getArrayRandomItem from '../utils/getArrayRandomItem';

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
  'Things that have a curve',
  'Straight',
  'undeviating',
  'linear',
  'direct',
  'uncurving',
];

export default () => (
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
);
