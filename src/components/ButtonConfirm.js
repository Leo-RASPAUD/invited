import React, { useState } from 'react';

import styles from './ButtonConfirm.module.scss';

export default ({ type = 'default', children, label, onConfirm, ...rest }) => {
  const [confirm, setConfirm] = useState(false);

  const handleClick = () => {
    onConfirm();
  };

  return confirm ? (
    <div className={styles.container}>
      <button className={styles.confirm} onClick={() => handleClick()}>
        Confirm
      </button>
      <button className={styles.cancel} onClick={() => setConfirm(false)}>
        Cancel
      </button>
    </div>
  ) : (
    <div className={styles.container}>
      <button
        onClick={() => setConfirm(true)}
        className={styles.button}
      >
        {children}
      </button>
    </div>
  );
};
