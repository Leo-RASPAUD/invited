import React from 'react';
import styles from './Item.module.scss';
import Button, { Buttons } from './Button';
import Background from './Background';

import eventThemes from '../constants/eventThemes';

const Item = ({ id, name, loading, date, host, place, type }) => {
  const { backgroundColor = 'grey', backgroundImage, ...rest } = eventThemes[type.toLowerCase()];
  return (
    <Background color={backgroundColor} image={backgroundImage}>
      <div className={styles['item']} style={rest}>
        <div className={styles['item-content']}>
          <h2 className={styles['item-heading']}>{name}</h2>
          <p className={styles['item-detail']}>{date}</p>
        </div>
        <Buttons>
          <Button to={`/app/event/${id}`}>View</Button>
        </Buttons>
      </div>
    </Background>
  );
};

export default Item;
