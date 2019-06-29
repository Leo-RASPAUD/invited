import React, { useState, useEffect } from 'react';
import styles from './BackgroundImage.module.scss';

const defaultSrc = 'https://s3-ap-southeast-2.amazonaws.com/invited.public/images/restaurant.jpg';

const BackgroundImage = ({ children, src = defaultSrc }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const imageLoader = new Image();
    imageLoader.src = src;

    imageLoader.onload = () => {
      setImageUrl(src);
    };
  }, []); // eslint-disable-line

  return (
    <div className={styles['background-image']}>
      <div
        className={`${styles['background-image-loader']} ${
          !imageUrl ? styles['background-loading'] : styles['background-loaded']
        }`}
        style={{
          backgroundImage: `url(${src})`,
        }}
      />
      <div className={styles['background-image-children']}>{children}</div>
    </div>
  );
};

export default BackgroundImage;
