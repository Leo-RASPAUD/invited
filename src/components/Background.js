import React, { useState, useEffect } from 'react';
import styles from './Background.module.scss';

const Background = ({ color = 'grey', children, image = '' }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const imageLoader = new Image();
    imageLoader.src = image;

    imageLoader.onload = () => {
      setImageUrl(image);
    };
  }, []); // eslint-disable-line

  return (
    <div className={styles['background']} style={{ background: color }}>
      <div
        className={`${styles['background-image']} ${
          !imageUrl ? styles['background-loading'] : styles['background-loaded']
        }`}
        style={{
          backgroundImage: `url(${image})`,
        }}
      />
      <div className={styles['background-children']}>{children}</div>
    </div>
  );
};

export default Background;
