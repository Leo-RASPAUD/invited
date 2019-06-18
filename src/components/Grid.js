import React from 'react';

function Sidebar({ children, theme }) {
  const styles = {
    display: 'grid',
    gap: 16,
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto',
  };

  return <div style={styles}>{children}</div>;
}

export default Sidebar;
