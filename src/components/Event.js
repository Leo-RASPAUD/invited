import React from 'react';
import Button, { Buttons } from './Button';
import Background from './Background';
import eventThemes from '../constants/eventThemes';

import styles from './Event.module.scss';

const Event = ({ id, name, date, type }) => {
  const { backgroundColor = 'grey', backgroundImage, ...rest } = eventThemes[type.toLowerCase()];
  return (
    <Background color={backgroundColor} image={backgroundImage}>
      <div className={styles['event']} style={rest}>
        <div className={styles['event-content']}>
          <h2 className={styles['event-heading']}>{name}</h2>
          <p className={styles['event-detail']}>{date}</p>
        </div>
        <Buttons>
          <Button to={`/app/event/${id}`}>View</Button>
        </Buttons>
      </div>
    </Background>
  );
};

export default Event;
