import React, { useState, useRef, useEffect } from 'react';

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
      height: 12,
      width: 12,
    },
    button: {
      appearance: 'none',
      border: 'none',
      borderRadius: 0,
      display: 'block',
      padding: 12,
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
    document.addEventListener('touchstart', handleClick);
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.addEventListener('touchstart', handleClick);
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <div>
      <button aria-label="Menu" onClick={() => setCollapse(!collapse)} style={styles.button}>
        <span style={styles.burger} />
      </button>
      <div
        style={{
          ...styles.collapse,
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
