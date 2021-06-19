import React, { useState } from 'react';

import { firebaseAuth } from '../../firebase/firebase';

import Modal from '../Modal/Modal';
import Button from '../Button/Button';

import classes from './LogoutModal.module.scss';

export default function LogoutModal({ closeModalCallback }) {
  const [errorMsg, setErrorMsg] = useState('');

  const handleCloseModal = () => {
    setErrorMsg('');
    closeModalCallback();
  };

  const handleLogout = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        setErrorMsg('');
        // alert('Logging out');
        closeModalCallback();
      })
      .catch(({ message }) => {
        setErrorMsg(message);
      });
  };

  return (
    <Modal closeModalCallback={handleCloseModal}>
      <h2 className={classes['modal__title']}>Logout?</h2>
      <hr />
      <div className={classes['modal__content']}>
        <div className={classes['modal__inputgroup']}>
          Are you sure you want to logout?
        </div>

        {errorMsg && <div style={{ color: 'red' }}>{errorMsg}</div>}
      </div>
      <hr />
      <div className={classes['modal__bottom']}>
        <Button onClick={handleCloseModal}>Close</Button>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </Modal>
  );
}
