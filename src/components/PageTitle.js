import React from 'react';
import styles from './PageTitle.module.scss';

const PageTitle = ({ children, h = 1, ...props }) => {
  switch (h) {
    case 1: {
      return (
        <h1 className={styles['page-title']} {...props}>
          {children}
        </h1>
      );
    }
    case 2: {
      return (
        <h2 className={styles['page-title']} {...props}>
          {children}
        </h2>
      );
    }
    case 3: {
      return (
        <h3 className={styles['page-title']} {...props}>
          {children}
        </h3>
      );
    }
    case 4: {
      return (
        <h4 className={styles['page-title']} {...props}>
          {children}
        </h4>
      );
    }
    case 5: {
      return (
        <h5 className={styles['page-title']} {...props}>
          {children}
        </h5>
      );
    }
    case 6: {
      return (
        <h5 className={styles['page-title']} {...props}>
          {children}
        </h5>
      );
    }
    default: {
      return (
        <h1 className={styles['page-title']} {...props}>
          {children}
        </h1>
      );
    }
  }
};

export default PageTitle;
