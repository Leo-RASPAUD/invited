import React from 'react';
import styles from './PageTitle.module.scss';

const PageTitle = ({ children, ...props }) => (
  <h1 className={styles['page-title']} {...props}>
    {children}
  </h1>
);

export default PageTitle;
