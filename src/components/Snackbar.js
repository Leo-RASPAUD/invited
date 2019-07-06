import React, { useContext } from 'react';
import { Context } from '../AppContext';
import SnackbarItem from './SnackbarItem';

export default () => {
  const {
    state: { snackbarItems },
  } = useContext(Context);

  return (
    <div style={{ position: 'fixed', zIndex: 10, top: 8, right: 8, left: 8 }}>
      {snackbarItems.map(item => (
        <SnackbarItem key={item.id} item={item} />
      ))}
    </div>
  );
};
