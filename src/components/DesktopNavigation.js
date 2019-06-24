import React from 'react';

import styles from './DesktopNavigation.module.scss';

export default ({ children }) => {
  return <div className={styles['container']}>{children}</div>;
};
