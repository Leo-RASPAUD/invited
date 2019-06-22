import React from 'react';
import styles from './Item.module.scss';
import Button, {Buttons} from './Button'

const Item = ({ id, name, loading, date, host, place, type }) => (
    <div className={styles['item']} key={id}>
      <h2 className={styles['item-title']}>{name}</h2>
      <p className={styles['item-title']}>{date}</p>
      <Buttons>
        <Button to={`/app/event/${id}`}>View</Button>
      </Buttons>
    </div>
  );

export default Item;
