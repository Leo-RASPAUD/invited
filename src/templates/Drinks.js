import React from 'react';
import getArrayRandomItem from '../utils/getArrayRandomItem';

const styles = {
  a: {
    fontSize: 88,
    fontWeight: 'bold',
    lineHeight: 1,
    margin: 0,
  },
  b: {
    fontSize: 32,
    lineHeight: 1,
    margin: '0 0 32px',
  },
  c: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 1,
    margin: '8px 0',
  },
  d: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 1,
    margin: '8px 0',
  },
};

const comments = [
  'Because sometimes you need to be interesting.',
  'Blah.',
  'Because.',
  'You will feel and look better.',
  'Any excuse will do.',
];

export default ({ type, host, date, time, place }) => {
  return (
    <div style={{ marginBottom: 56 }}>
      <h1 style={styles.a}>Drinks</h1>
      <p style={styles.b}>
        with <strong>{host}</strong>
      </p>
      <p style={styles.d}>
        {date}, {time}
      </p>
      <p style={styles.c}>{place}</p>
      <p>{getArrayRandomItem(comments)}</p>
    </div>
  );
};
