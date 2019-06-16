import React, { useContext } from 'react';
import styles from './Event.module.scss';
import { deleteEvent as deleteEventMutation } from '../mutations/eventMutations';
import { Context } from '../AppContext';
import { actions } from '../reducers/eventsReducer';
import { Link } from 'react-router-dom';
import useFetcher from '../hooks/useFetcher';

export default event => {
  const { dispatchEvents } = useContext(Context);
  const { fetcher } = useFetcher();

  const { id, name, loading } = event;

  const deleteEvent = async id => {
    dispatchEvents({ type: actions.deleteEventLoading, payload: { id } });
    try {
      fetcher({ ...deleteEventMutation, params: { id } });
    } catch (error) {
      dispatchEvents({ type: actions.deleteEventError, payload: { id } });
    }
  };

  return (
    <div key={id} className={styles['event-container']}>
      <h1>{name}</h1>
      {loading && <div>loading</div>}
      <div>{id}</div>
      <button onClick={() => deleteEvent(id)}>Delete</button>
      <Link to={`/app/event/${id}`}>Details</Link>
    </div>
  );
};
