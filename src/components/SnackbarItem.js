import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../AppContext';
import { actions } from '../reducers/globalReducer';

import styles from './SnackbarItem.module.scss';
import { MdClose } from 'react-icons/md';

export default ({ item: { id, message } }) => {
  const { dispatchGlobal } = useContext(Context);
  const [height, setHeight] = useState(0);

  const closeSnackbarItem = id => {
    dispatchGlobal({ type: actions.closeSnackbarItem, payload: id });
  };

  setTimeout(() => {
    setHeight(0);
    setTimeout(() => {
      dispatchGlobal({ type: actions.closeSnackbarItem, payload: id });
    }, 500);
  }, 2000);

  useEffect(() => {
    setTimeout(() => {
      setHeight(52);
    }, 100);
  }, []);

  return (
    <div className={styles['snackbar-item']} style={{ height }}>
      <div className={styles['snackbar-container']}>
        <div className={styles['snackbar-content']}>
          <div className={styles['snackbar-message']}>{message}</div>
          <button className={styles['cancel']} onClick={() => closeSnackbarItem(id)}>
            <MdClose />
          </button>
        </div>
      </div>
    </div>
  );
};
