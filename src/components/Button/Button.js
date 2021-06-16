import React from 'react';
import classes from './Button.module.scss';

export default function Button({ type = 'normal', onClick, children, styles }) {
  return (
    <button
      className={`${classes['btn']} ${
        type === 'special' && classes['btn--special']
      }`}
      onClick={onClick}
      styles={styles}
    >
      {children}
    </button>
  );
}
