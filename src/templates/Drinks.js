import React from 'react';
import getArrayRandomItem from '../utils/getArrayRandomItem';

const styles = {
  name: {
    fontSize: 64,
    fontWeight: 'bold',
    lineHeight: 1,
    margin: '0 0 32px',
  },
  host: {
    fontSize: 32,
    lineHeight: 1,
    margin: '0 0 32px',
  },
  dateTime: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 1,
    margin: '8px 0',
  },
  place: {
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

export default ({ date, host, name, place, time, type }) => {
  return (
    <div style={{ marginBottom: 56 }}>
      <h1 style={styles.name}>{name}</h1>
      <p style={styles.host}>
        with <strong>{host}</strong>
      </p>
      <p style={styles.dateTime}>
        {date}, {time}
      </p>
      <p style={styles.place}>{place}</p>
      <p>{getArrayRandomItem(comments)}</p>
    </div>
  );
};
