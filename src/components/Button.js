import React from 'react';
import { Link } from 'react-router-dom'

import styles from './Button.module.scss';

export default props => {
  if (props.to) {
    return <Link className={styles.button} {...props} />
  } 
  if (props.href) {
    return <a className={styles.button} {...props} />
  } 
  return <button className={styles.button} {...props} /> 
};
