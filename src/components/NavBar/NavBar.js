import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

import Button from '../Button/Button';
import MobileNavBar from './MobileNavBar';

import classes from './NavBar.module.scss';
import UserContext from '../../context/UserContext';

export default function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  useEffect(() => {
    setUser({ name: 'lol' });
  }, []);
  return (
    <>
      <MobileNavBar />
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
              <Button type='special'>Sign up</Button>
              <Button>Login</Button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
