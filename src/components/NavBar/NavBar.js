import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import Button from '../Button/Button';
import MobileNavBar from './MobileNavBar';
import RegisterModal from '../RegisterModal/RegisterModal';
import LoginModal from '../LoginModal/LoginModal';
import LogoutModal from '../LogoutModal/LogoutModal';

import classes from './NavBar.module.scss';
import UserContext from '../../context/UserContext';

export default function NavBar() {
  const [user] = useContext(UserContext);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleOpenLoginModal = () => setIsLoginModalOpen(true);
  const handleOpenRegisterModal = () => setIsRegisterModalOpen(true);
  const handleOpenLogoutModal = () => setIsLogoutModalOpen(true);

  return (
    <>
      {isLoginModalOpen && (
        <LoginModal closeModalCallback={() => setIsLoginModalOpen(false)} />
      )}
      {isRegisterModalOpen && (
        <RegisterModal
          closeModalCallback={() => setIsRegisterModalOpen(false)}
        />
      )}
      {isLogoutModalOpen && (
        <LogoutModal closeModalCallback={() => setIsLogoutModalOpen(false)} />
      )}

      <MobileNavBar
        handleOpenLoginModal={handleOpenLoginModal}
        handleOpenRegisterModal={handleOpenRegisterModal}
        handleOpenLogoutModal={handleOpenLogoutModal}
      />
      <nav className={classes['navbar']}>
        <div
          className={`${classes['navbar__section']} ${classes['navbar__section--left']}`}
        >
          <Link className={classes['navbar__brand']} to='/'>
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
            <>
            <div className={classes['navbar__email']}>{user.email}</div>
            <Button onClick={handleOpenLogoutModal}>Logout</Button>
            </>
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
