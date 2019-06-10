import React from 'react';
import styles from './Event.module.scss';

export default event => {
  const { id, name } = event;
  const deleteEvent = () => {
    console.log('delete');
  };

  return (
    <div key={id} className={styles['event-container']}>
      <h1>{name}</h1>
      <button onClick={() => deleteEvent()}>X</button>
    </div>
  );
};
