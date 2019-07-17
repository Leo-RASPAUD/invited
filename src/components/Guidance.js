import React from 'react';
import styles from './Guidance.module.scss';

const Guidance = ({ content }) => {
  return <span className={styles['content']}>{content}</span>;
};

export default Guidance;
