import React from 'react';

function Sidebar({ children, theme }) {
  const styles = {
    boxSizing: 'border-box',
    padding: 16,
    position: 'relative',
    zIndex: 1,
  };

  return <main style={styles}>{children}</main>;
}

export default Sidebar;
