import React from 'react';
import ButtonConfirm from './ButtonConfirm';
import useFetcher from '../hooks/useFetcher';
import { deleteGuest } from '../mutations/guestMutations';
import styles from './Guest.module.scss';
import classnames from 'classnames';

export default ({ firstName, lastName, email, id, accepted, emailSent }) => {
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
      <div>Email {emailSent ? 'sent' : 'not sent'}</div>
      <div className={styles['delete-button']}>
        <ButtonConfirm onConfirm={deleteItem}>Delete</ButtonConfirm>
      </div>
    </div>
  );
};
