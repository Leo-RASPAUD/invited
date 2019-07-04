import React from 'react';
import styles from './Invitation.module.scss';
import BackgroundFixed from './BackgroundFixed';
import Wedding from '../templates/Wedding';
import Birthday from '../templates/Birthday';
import Funeral from '../templates/Funeral';
import Drinks from '../templates/Drinks';
import Restaurant from '../templates/Restaurant';
import Party from '../templates/Party';
import eventThemes from '../constants/eventThemes';
import eventTypes from '../constants/eventTypes';

const Invitation = ({ event, type }) => {
  const { backgroundImage, ...rest } = eventThemes[type.toLowerCase()];
  return (
    <BackgroundFixed image={backgroundImage}>
      <div style={rest}>
        <div className={styles['invitation']}>
          {eventTypes.wedding === eventTypes[type] && <Wedding {...event} />}
          {eventTypes.birthday === eventTypes[type] && <Birthday {...event} />}
          {eventTypes.funeral === eventTypes[type] && <Funeral {...event} />}
          {eventTypes.drinks === eventTypes[type] && <Drinks {...event} />}
          {eventTypes.restaurant === eventTypes[type] && <Restaurant {...event} />}
          {eventTypes.party === eventTypes[type] && <Party {...event} />}
        </div>
      </div>
    </BackgroundFixed>
  );
};

export default Invitation;
