import React, { useState, useRef, useEffect } from 'react';

const themeDefault = {
  background: 'coral',
  color: 'white',
};

function Sidebar({ children, theme = themeDefault }) {
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
      appearance: 'none',
      border: 'none',
      borderRadius: 0,
      display: 'block',
      fontSize: 24,
      left: -56,
      padding: 15,
      position: 'absolute',
      top: 14,
      ...theme,
    },
    collapse: {
      height: '100vh',
      position: 'fixed',
      transition: `right .2s ease-in-out`,
      width: 240,
      zIndex: 2,
      ...theme,
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
      <button aria-label="Menu" onClick={() => setCollapse(!collapse)} style={styles.button}>
        <span style={styles.burger} />
      </button>
      <div>{children}</div>
    </div>
  );
}

export default Sidebar;
