import React from 'react';

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

export default ({ date, host, place, time, type }) => {
  return (
    <div style={{ marginBottom: 56 }}>
      <h1 style={styles.a}>Party</h1>
      <p style={styles.b}>
        with <strong>{host}</strong>
      </p>
      <p style={styles.c}>
        {date}, {time}
      </p>
      <p style={styles.d}>{place}</p>
    </div>
  );
};
