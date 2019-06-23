import React from 'react';
import styles from './Item.module.scss';
import Button, { Buttons } from './Button';

const Item = ({ id, name, loading, date, host, place, type }) => (
  <div className={styles['item']}>
    <div className={styles['item-content']}>
      <h2 className={styles['item-heading']}>{name}</h2>
      <p className={styles['item-detail']}>{date}</p>
    </div>
    <Buttons>
      <Button to={`/app/event/${id}`}>View</Button>
    </Buttons>
  </div>
);

export default Item;
