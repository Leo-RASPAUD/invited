import React, { useState } from 'react';

import styles from './Button.module.scss';

export default ({ type = 'default', children, label, onConfirm, ...rest }) => {
  const [isConfirm, setConfirm] = useState(false);

  const handleClick = () => {
    if (isConfirm) {
      onConfirm();
    } else {
      setConfirm(true);
    }
  };

  return (
    <button
      {...rest}
      onClick={handleClick}
      className={`button ${styles['with-confirm']} ${isConfirm ? styles['confirm'] : ''}`}
    >
      {isConfirm && (
        <button className={styles['cancel']} onClick={() => setConfirm(false)}>
          &#x1f860;
        </button>
      )}
      <div>{isConfirm ? 'Are you sure?' : children}</div>
    </button>
  );
};
