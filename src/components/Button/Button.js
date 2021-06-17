import React from 'react';
import classes from './Button.module.scss';

export default function Button({
  variant = 'normal',
  onClick,
  children,
  ...props
}) {
  return (
    <button
      className={`${classes['btn']} ${
        variant === 'special' && classes['btn--special']
      }`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
