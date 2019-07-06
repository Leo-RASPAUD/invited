import React, { useContext } from 'react';
import { Context } from '../AppContext';
import SnackbarItem from './SnackbarItem';

export default () => {
  const {
    state: { snackbarItems },
  } = useContext(Context);

  return snackbarItems.map(item => <SnackbarItem key={item.id} item={item} />);
};
