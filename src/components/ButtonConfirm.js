import React, { useState } from 'react';

import styles from './ButtonConfirm.module.scss';
import { MdCheck, MdClose } from 'react-icons/md';

export default ({ type = 'default', children, label, onConfirm, ...rest }) => {
  const [confirm, setConfirm] = useState(false);

  const handleClick = () => {
    onConfirm();
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.confirmation} ${confirm ? styles['confirmation-true'] : styles['confirmation-false']}`}>
        <button className={styles.confirm} onClick={() => handleClick()}>
          <MdCheck />
        </button>
        <button className={styles.cancel} onClick={() => setConfirm(false)}>
          <MdClose />
        </button>
      </div>
      <button onClick={() => setConfirm(true)} className={styles.button}>
        {children}
      </button>
    </div>
  );
};
