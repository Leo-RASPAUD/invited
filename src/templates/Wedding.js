import React from 'react';

import styles from './Wedding.module.scss';

export default ({ date, details, host, name, place, time, type }) => {
  return (
    <div style={{ marginBottom: 32 }}>
      <h1 className={styles['name']}>{name}</h1>
      <p className={styles['host']}>
        <strong>{host}</strong>
      </p>
      <p className={styles['date-time']}>
        {date}, {time}
      </p>
      <p className={styles['place']}>{place}</p>
      {details && <p className={styles['details']}>{details}</p>}
    </div>
  );
};
