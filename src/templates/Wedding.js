import React from 'react';

const styles = {
  a: {
    fontSize: 32,
    lineHeight: 1,
    margin: '0 0 8px',
  },
  b: {
    fontSize: 64,
    fontWeight: 'bold',
    lineHeight: 1,
    margin: '0 0 8px',
  },
  c: {
    fontSize: 32,
    lineHeight: '48px',
    margin: '0 0 32px',
  },
  d: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 1,
    margin: '8px 0',
  },
  e: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 1,
    margin: '32px 0 8px',
  },
};

export default ({ date, host, place, time, type }) => {
  return (
    <div style={{ marginBottom: 56 }}>
      <p style={styles.a}>The</p>
      <h1 style={styles.b}>Wedding</h1>
      <p style={styles.c}>
        of <strong>{host}</strong>
      </p>
      <p style={styles.d}>
        {date}, {time}
      </p>
      <p style={styles.d}>{place}</p>
      <p style={styles.e}>Reception to follow</p>
    </div>
  );
};
