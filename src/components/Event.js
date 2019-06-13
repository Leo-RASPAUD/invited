import React, { useState, useContext } from 'react';
import styles from './Event.module.scss';
import graphql from '../utils/graphql';
import eventMutations from '../mutations/event';
import { Context } from '../AppContext';
import { actions } from '../reducers/eventReducer';

export default event => {
  const [loading, setLoading] = useState(false);
  const { state, dispatchEvents } = useContext(Context);

  const { id, name } = event;
  const deleteEvent = async id => {
    dispatchEvents({ type: actions.deleteEventLoading, payload: { id } });
    setLoading(true);
    await graphql.mutation({ ...eventMutations.deleteEvent, params: { id } });
    setLoading(false);
    dispatchEvents({ type: actions.deleteEventSuccess, payload: { id } });
  };

  return (
    <div key={id} className={styles['event-container']}>
      <h1>{name}</h1>
      {loading && <div>loading</div>}
      <button onClick={() => deleteEvent(id)}>Delete</button>
    </div>
  );
};
