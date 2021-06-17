import React, { useState, useEffect } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';

import Button from '../Button/Button';
import Modal from '../Modal/Modal';

import classes from './RegisterModal.module.scss';

export default function RegisterModal({ closeModalCallback }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (confirmPassword !== '' && password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
    } else {
      setErrorMsg('');
    }
  }, [password, confirmPassword]);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleCloseModal = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrorMsg('');
    closeModalCallback();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrorMsg('');
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
    }
    alert('Registered');
  };
  return (
    <Modal closeModalCallback={handleCloseModal}>
      <h2 className={classes['modal__title']}>Register now!</h2>
      <hr />
      <form
        id='register-form'
        className={classes['modal__content']}
        onSubmit={handleSubmit}
      >
        <label className={classes['modal__inputgroup']} htmlFor='email'>
          <FiMail size='2rem' />
          <input
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
            className={classes['modal__input']}
            name='password'
            type='password'
            required
            value={password}
            placeholder='Password'
            onChange={handlePasswordChange}
            pattern='(?=^.{8,}$)(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$'
            title='Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
          />
        </label>
        <label
          className={classes['modal__inputgroup']}
          htmlFor='confirmPassword'
        >
          <FiLock size='2rem' />
          <input
            className={classes['modal__input']}
            name='confirmPassword'
            type='password'
            required
            value={confirmPassword}
            placeholder='Confirm Password'
            onChange={handleConfirmPasswordChange}
            pattern='(?=^.{8,}$)(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$'
            title='Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
          />
        </label>
        {errorMsg && <div style={{ color: 'red' }}>{errorMsg}</div>}
      </form>
      <hr />
      <div className={classes['modal__bottom']}>
        <Button onClick={handleCloseModal}>Close</Button>
        <Button variant='special' type='submit' form='register-form'>
          Register
        </Button>
      </div>
    </Modal>
  );
}
