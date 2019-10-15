import React from 'react';
import ButtonConfirm from './ButtonConfirm';
import useFetcher from '../hooks/useFetcher';
import { deleteGuest } from '../mutations/guestMutations';
import styles from './Guest.module.scss';
import classnames from 'classnames';
import {} from 'react-icons/md';

export default props => {
  const { firstName, lastName, email, id, accepted, notes, participants } = props;
  const { fetcher } = useFetcher();
  const deleteItem = () => {
    fetcher({ ...deleteGuest, params: { id } });
  };
  function getParticipantsText(participants) {
    const s = participants === '1' ? '' : 's';
    return `${participants} participant${s}`;
  }
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
      <p className={styles['notes']}>{participants ? getParticipantsText(participants) : '_'}</p>
      <p className={styles['notes']}>{notes ? notes : '_'}</p>
      <div className={styles['delete-button']}>
        <ButtonConfirm onConfirm={deleteItem}>Delete</ButtonConfirm>
      </div>
    </div>
  );
};
