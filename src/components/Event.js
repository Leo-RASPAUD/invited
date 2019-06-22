import React, { useState, useEffect } from 'react';
import styles from './Event.module.scss';
import { deleteEvent as deleteEventMutation } from '../mutations/eventMutations';
import useFetcher from '../hooks/useFetcher';
import { withRouter } from 'react-router-dom';

const Event = ({ id, name, loading, date, host, place, type, history }) => {
  const { fetcher } = useFetcher();
  const [imageUrl, setImageUrl] = useState(null);

  const src = 'https://s3-ap-southeast-2.amazonaws.com/invited.public/images/restaurant.jpg';

  const deleteEvent = async id => {
    fetcher({ ...deleteEventMutation, params: { id } });
  };

  useEffect(() => {
    const imageLoader = new Image();
    imageLoader.src = src;

    imageLoader.onload = () => {
      setImageUrl(src);
    };
  });

  return (
    <div key={id}>
      <div className={styles['outer-div']} onClick={() => history.push(`/app/event/${id}`)}>
        <div className={styles['title']}>{name}</div>
        <div className={styles['delete-button']} onClick={() => deleteEvent(id)}>
          X
        </div>
        <div className={`${!imageUrl ? styles['visible'] : styles['hidden']} ${styles['placeholder']} `} />
        <div
          className={`${styles['inner-div']} ${!imageUrl ? styles['hidden'] : styles['visible']}`}
          style={{
            backgroundImage: `url(${src})`,
          }}
        />
      </div>
    </div>
  );
};

export default withRouter(Event);
