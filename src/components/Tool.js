import React from 'react';
import styles from './Tool.module.scss';

function Tool(props) {
  return <div className={styles['tool']} {...props} />;
}

export default Tool;
