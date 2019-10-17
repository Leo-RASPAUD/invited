import React, { useState } from 'react';
import classnames from 'classnames';
import styles from './ButtonConfirm.module.scss';
import { MdCheck, MdClose } from 'react-icons/md';

export default ({ type = 'default', children, label, onConfirm, condensed, ...rest }) => {
  const [confirm, setConfirm] = useState(false);

  const handleClick = () => {
    onConfirm();
  };

  return (
    <div className={classnames(styles.container, condensed && styles.condensed)}>
      <div className={`${styles.confirmation} ${confirm ? styles['confirmation-true'] : styles['confirmation-false']}`}>
        <button className={styles.cancel} onClick={() => setConfirm(false)}>
          <MdClose />
        </button>
        <button className={styles.confirm} onClick={() => handleClick()}>
          <MdCheck />
        </button>
      </div>
      <button onClick={() => setConfirm(true)} className={styles.button}>
        {children}
      </button>
    </div>
  );
};
