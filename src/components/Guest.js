import React from 'react';
import ButtonConfirm from './ButtonConfirm';
import useFetcher from '../hooks/useFetcher';
import { deleteGuest } from '../mutations/guestMutations';
import { resendInvite } from '../queries/guestQueries';
import styles from './Guest.module.scss';
import classnames from 'classnames';
import {} from 'react-icons/md';

export default props => {
  const { firstName, lastName, email, id, accepted, notes, participants } = props;
  const {
    fetcher,
    state: {
      event: { id: eventId, name, type, place, date, host, time, details },
    },
  } = useFetcher();
  const deleteItem = () => {
    fetcher({ ...deleteGuest, params: { id } });
  };

  const getParticipantsText = participants => {
    const s = participants === '1' ? '' : 's';
    return `${participants} participant${s}`;
  };

  const resendInviteAction = async () => {
    await fetcher({
      ...resendInvite,
      params: {
        eventId,
        name,
        type,
        place,
        date,
        host,
        time,
        guests: JSON.stringify([{ ...props }]),
        details,
      },
    });
  };

  return (
    <div
      className={classnames(styles['container'], accepted !== null && (accepted ? styles.accepted : styles.refused))}
    >
      <h3 className={styles.name}>
        {firstName} {lastName}
      </h3>
      <p className={styles.email}>{email}</p>
      <p className={styles.participants}>{participants ? getParticipantsText(participants) : '_'}</p>
      <p className={styles.notes}>{notes ? notes : '_'}</p>
      <div className={styles.actions}>
        <ButtonConfirm condensed onConfirm={deleteItem}>
          Delete
        </ButtonConfirm>
        <ButtonConfirm condensed onConfirm={resendInviteAction}>
          Resend
        </ButtonConfirm>
      </div>
    </div>
  );
};
