import React, { useState } from 'react';
import styles from './Event.module.scss';
import graphql from '../utils/graphql';
import eventMutations from '../mutations/event';

export default event => {
  const [loading, setLoading] = useState(false);

  const { id, name } = event;
  const deleteEvent = async id => {
    setLoading(true);
    await graphql.mutation({ ...eventMutations.deleteEvent, params: { id } });
    setLoading(false);
  };

  return (
    <div key={id} className={styles['event-container']}>
      <h1>{name}</h1>
      {loading && <div>loading</div>}
      <button onClick={() => deleteEvent(id)}>Delete</button>
    </div>
  );
};
