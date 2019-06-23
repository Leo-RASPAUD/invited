import React from 'react';
import Button from '../components/Button';
import useFetcher from '../hooks/useFetcher';
import { deleteGuest } from '../mutations/guestMutations';
import styles from './Guest.module.scss';

export default ({ firstName, lastName, email, id }) => {
  const { fetcher } = useFetcher();

  const deleteItem = () => {
    fetcher({ ...deleteGuest, params: { id } });
  };
  return (
    <div className={styles['container']}>
      <div>{firstName}</div>
      <div>{lastName}</div>
      <div>{email}</div>
      <div className={styles['delete-button']}>
        <Button onClick={deleteItem}>Delete</Button>
      </div>
    </div>
  );
};
