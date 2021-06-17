import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import Button from '../Button/Button';
import MobileNavBar from './MobileNavBar';
import Modal from '../Modal/Modal';
import RegisterModal from '../RegisterModal/RegisterModal';

import classes from './NavBar.module.scss';
import UserContext from '../../context/UserContext';

export default function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleOpenLoginModal = () => setIsLoginModalOpen(true);
  const handleOpenRegisterModal = () => setIsRegisterModalOpen(true);

  return (
    <>
      {isLoginModalOpen && (
        <Modal closeModalCallback={() => setIsLoginModalOpen(false)}>
          LoginModal
        </Modal>
      )}
      {isRegisterModalOpen && (
        <RegisterModal
          closeModalCallback={() => setIsRegisterModalOpen(false)}
        />
      )}

      <MobileNavBar
        handleOpenLoginModal={handleOpenLoginModal}
        handleOpenRegisterModal={handleOpenRegisterModal}
      />
      <nav className={classes['navbar']}>
        <div
          className={`${classes['navbar__section']} ${classes['navbar__section--left']}`}
        >
          <Link className={classes['navbar__brand']} to='/trades'>
            APB-Trader
          </Link>
          <div className={classes['navbar__list']}>
            <NavLink
              className={classes['navbar__listitem']}
              activeClassName={classes['navbar__listitem--active']}
              to='/'
              exact
            >
              Home
            </NavLink>

            <NavLink
              className={classes['navbar__listitem']}
              activeClassName={classes['navbar__listitem--active']}
              to='/trades'
            >
              Trades
            </NavLink>
          </div>
        </div>
        <div
          className={`${classes['navbar__section']} ${classes['navbar__section--right']}`}
        >
          {user ? (
            <Button>Logout</Button>
          ) : (
            <div className={classes['navbar__list']}>
              <Button
                variant='special'
                onClick={() => setIsRegisterModalOpen(true)}
              >
                Sign up
              </Button>
              <Button onClick={() => setIsLoginModalOpen(true)}>Login</Button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
