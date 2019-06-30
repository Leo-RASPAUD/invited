import React from 'react';
import styles from './Invitation.module.scss';
import Background from './Background';

import eventThemes from '../constants/eventThemes';

const Invitation = ({ children, type }) => {
  const { backgroundColor = 'grey', backgroundImage, ...rest } = eventThemes[type.toLowerCase()];
  return (
    <Background color={backgroundColor} image={backgroundImage} withMargin>
      <div className={styles['invitation']} style={rest}>
        {children}
      </div>
    </Background>
  );
};

export default Invitation;
