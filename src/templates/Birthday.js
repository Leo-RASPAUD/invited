import React from 'react';

const styles = {
  a: {
    fontSize: 32,
    lineHeight: 1,
    margin: 0,
  },
  b: {
    fontSize: 72,
    fontWeight: 'bold',
    lineHeight: 1,
    margin: '0 0 32px',
  },
  c: {
    fontSize: 32,
    lineHeight: 1,
    margin: '0 0 32px',
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
      <p style={styles.a}>You're &mdash;</p>
      <h1 style={styles.b}>invited!</h1>
      <p style={styles.c}>
        Celebrate <strong>{host}'s</strong> birthday
      </p>
      <p style={styles.d}>
        {date}, {time}
      </p>
      <p style={styles.d}>{place}</p>
    </div>
  );
};
