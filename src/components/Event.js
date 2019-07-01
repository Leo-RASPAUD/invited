import React from 'react';
import Button, { Buttons } from './Button';
import Background from './Background';
import eventThemes from '../constants/eventThemes';
import { MdPageview } from 'react-icons/md';
import IconText from './IconText';

import styles from './Event.module.scss';

const Event = ({ id, name, loading, date, host, place, type }) => {
  const { backgroundColor = 'grey', backgroundImage, ...rest } = eventThemes[type.toLowerCase()];
  return (
    <Background color={backgroundColor} image={backgroundImage}>
      <div className={styles['event']} style={rest}>
        <div className={styles['event-content']}>
          <h2 className={styles['event-heading']}>{name}</h2>
          <p className={styles['event-detail']}>{date}</p>
        </div>
        <Buttons>
          <Button to={`/app/event/${id}`}>
            <IconText icon={MdPageview}>View</IconText>
          </Button>
        </Buttons>
      </div>
    </Background>
  );
};

export default Event;
