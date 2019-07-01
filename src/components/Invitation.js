import React from 'react';
import styles from './Invitation.module.scss';
import BackgroundFixed from './BackgroundFixed';

import eventThemes from '../constants/eventThemes';

const Invitation = ({ children, type }) => {
  const { backgroundColor, backgroundImage, ...rest } = eventThemes[type.toLowerCase()];
  return (
    <BackgroundFixed image={backgroundImage}>
      <div className={styles['invitation']} style={rest}>
        {children}
      </div>
    </BackgroundFixed>
  );
};

export default Invitation;
