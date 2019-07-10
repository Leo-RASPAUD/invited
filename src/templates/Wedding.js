import React from 'react';

const styles = {
  name: {
    fontSize: 56,
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
  proceeding: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 1,
    margin: '8px 0',
  },
};

export default ({ date, host, name, place, time, type }) => {
  return (
    <div style={{ marginBottom: 56 }}>
      <h1 style={styles.name}>{name}</h1>
      <p style={styles.host}>
        of <strong>{host}</strong>
      </p>
      <p style={styles.dateTime}>
        {date}, {time}
      </p>
      <p style={styles.place}>{place}</p>
      <p style={styles.proceeding}>Reception to follow</p>
    </div>
  );
};
