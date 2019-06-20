import React from 'react';

import styles from './Label.module.scss';

export default ({ icon, label }) => {
  return (
    <div className={styles['container']}>
      {icon && React.createElement(icon, { className: styles['icon'] })}
      <div>{label}</div>
    </div>
  );
};
