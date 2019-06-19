import React from 'react';

import styles from './Error.module.scss';

export default ({ errorMessage }) => {
  return <div className={`${styles['error']}`}>{errorMessage}</div>;
};
