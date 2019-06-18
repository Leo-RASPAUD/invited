import React from 'react';

const themeDefault = {
  background: 'coral',
  color: 'white',
};

function Sidebar({ children, theme = themeDefault }) {
  const [collapse, setCollapse] = React.useState(false);

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
      borderRadius: 2,
      top: 14,
      display: 'block',
      fontSize: 24,
      padding: 15,
      position: 'absolute',
      left: -56,
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

  return (
    <div
      style={{
        ...styles.collapse,
        right: collapse ? -240 : 0,
      }}
    >
      <button aria-label="Menu" onClick={() => setCollapse(!collapse)} style={styles.button}>
        <span style={styles.burger} />
      </button>
      <div>{children}</div>
    </div>
  );
}

export default Sidebar;