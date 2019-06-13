import React, { useState, useContext } from 'react';
import styles from './Event.module.scss';
import graphql from '../utils/graphql';
import eventMutations from '../mutations/event';
import { Context } from '../AppContext';
import { actions } from '../reducers/eventReducer';

export default event => {
  const [loading, setLoading] = useState(false);
  const { dispatchEvents } = useContext(Context);

  const { id, name } = event;
  const deleteEvent = async id => {
    dispatchEvents({ type: actions.deleteEventLoading, payload: { id } });
    setLoading(true);
    try {
      await graphql.mutation({ ...eventMutations.deleteEvent, params: { id } });
      setLoading(false);
      dispatchEvents({ type: actions.deleteEventSuccess, payload: { id } });
    } catch (error) {
      dispatchEvents({ type: actions.deleteEventError, payload: { id } });
    }
  };

  return (
    <div key={id} className={styles['event-container']}>
      <h1>{name}</h1>
      {loading && <div>loading</div>}
      <button onClick={() => deleteEvent(id)}>Delete</button>
    </div>
  );
};
