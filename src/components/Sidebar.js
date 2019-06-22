import React, { useState, useRef, useEffect } from 'react';
import Button from './Button'

function Sidebar({ children }) {
  const [collapse, setCollapse] = useState(true);
  const node = useRef();

  const styles = {
    burger: {
      borderBottom: 'solid 3px',
      borderTop: 'solid 3px',
      boxSizing: 'border-box',
      color: 'inherit',
      display: 'block',
      height: 14,
      width: 14,
    },
    button: {
      display: 'block',
      right: 248  ,
      position: 'absolute',
      top: 8,
    },
    collapse: {
      background: 'coral',
      color: 'white',
      height: '100vh',
      position: 'fixed',
      top: 0,
      transition: `right .2s ease-in-out`,
      width: 240,
      zIndex: 2,
    },
  };

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      return;
    }

    setCollapse(true);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <div
      style={{
        ...styles.collapse,
        right: collapse ? -240 : 0,
      }}
      ref={node}
    >

      <div style={styles.button}>
        <Button onClick={() => setCollapse(!collapse)}>Menu</Button>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default Sidebar;
