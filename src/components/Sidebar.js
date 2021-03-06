import React, { useState, useRef, useEffect } from 'react';

import styles from './Sidebar.module.scss';

function Sidebar({ children }) {
  const [collapse, setCollapse] = useState(true);
  const node = useRef();

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      return;
    }

    setCollapse(true);
  };

  useEffect(() => {
    document.addEventListener('touchstart', handleClick);
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.addEventListener('touchstart', handleClick);
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <div className={styles['container']}>
      <button onClick={() => setCollapse(!collapse)} className={styles['button']}>
        Menu
      </button>
      <div
        className={`${styles['collapse']} ${collapse ? styles['is-out'] : styles['is-in']}`}
        style={{
          right: collapse ? -240 : 0,
        }}
        ref={node}
      >
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Sidebar;
