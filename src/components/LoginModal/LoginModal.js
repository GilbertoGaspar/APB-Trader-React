import React, { useState, useContext } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';

import { firebaseAuth } from '../../firebase/firebase';
import UserContext from '../../context/UserContext';

import Modal from '../Modal/Modal';
import Button from '../Button/Button';

import classes from './LoginModal.module.scss';

export default function LoginModal({ closeModalCallback }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [, setUser] = useContext(UserContext);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleCloseModal = () => {
    setEmail('');
    setPassword('');
    setErrorMsg('');
    closeModalCallback();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        setUser(user);
        handleCloseModal();
      })
      .catch(() => {
        setErrorMsg('Username and/or Password are invalid.');
        setPassword('');
      });
  };

  return (
    <Modal closeModalCallback={handleCloseModal}>
      <h2 className={classes['modal__title']}>Login now!</h2>
      <hr />
      <form
        id='login-form'
        className={classes['modal__content']}
        onSubmit={handleSubmit}
      >
        <label className={classes['modal__inputgroup']} htmlFor='email'>
          <FiMail size='2rem' />
          <input
            id='email'
            className={classes['modal__input']}
            name='email'
            type='email'
            required
            value={email}
            onChange={handleEmailChange}
            placeholder='Email'
          />
        </label>
        <label className={classes['modal__inputgroup']} htmlFor='password'>
          <FiLock size='2rem' />
          <input
            id='password'
            className={classes['modal__input']}
            name='password'
            type='password'
            required
            value={password}
            placeholder='Password'
            onChange={handlePasswordChange}
          />
        </label>
        {errorMsg && <div style={{ color: 'red' }}>{errorMsg}</div>}
      </form>
      <hr />
      <div className={classes['modal__bottom']}>
        <Button onClick={handleCloseModal}>Close</Button>
        <Button variant='special' type='submit' form='login-form'>
          Login
        </Button>
      </div>
    </Modal>
  );
}
