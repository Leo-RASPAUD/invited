import React from 'react';
import ButtonConfirm from './ButtonConfirm';
import useFetcher from '../hooks/useFetcher';
import { deleteGuest } from '../mutations/guestMutations';
import styles from './Guest.module.scss';
import classnames from 'classnames';
import {} from 'react-icons/md';

export default ({ firstName, lastName, email, id, accepted, notes }) => {
  const { fetcher } = useFetcher();
  const deleteItem = () => {
    fetcher({ ...deleteGuest, params: { id } });
  };
  return (
    <div
      className={classnames(
        styles['container'],
        accepted !== null && (accepted ? styles['container-accepted'] : styles['container-refused']),
      )}
    >
      <h3>
        {firstName} {lastName}
      </h3>
      <div>{email}</div>
      <p className={styles['notes']}>{notes ? notes : '_'}</p>
      <div className={styles['delete-button']}>
        <ButtonConfirm onConfirm={deleteItem}>Delete</ButtonConfirm>
      </div>
    </div>
  );
};
