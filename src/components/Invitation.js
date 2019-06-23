import React from 'react';
import styles from './Invitation.module.scss';

const Invitation = ({ children }) => <div className={styles['invitation']}>{children}</div>;

export default Invitation;
