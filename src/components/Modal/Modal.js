import React from 'react';
import { FiX } from 'react-icons/fi';

import classes from './Modal.module.scss';

export default function Modal({ children, closeModalCallback }) {
  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      closeModalCallback();
    }
  };
  return (
    <div className={classes['modal']} onMouseDown={handleCloseModal}>
      <FiX
        className={classes['modal__close']}
        size='2rem'
        onClick={handleCloseModal}
      />
      <div className={classes['modal__content']}>{children}</div>
    </div>
  );
}
