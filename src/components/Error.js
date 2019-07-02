import React from 'react';
import { MdErrorOutline } from 'react-icons/md';

import styles from './Error.module.scss';

export default ({ errorMessage }) => {
  return (
    <div className={`${styles['error']}`}>
      <MdErrorOutline className={`${styles['error-icon']}`} />
      <div>{errorMessage}</div>
    </div>
  );
};
