import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';

import Button from '../Button/Button';

import classes from './NavBar.module.scss';
import UserContext from '../../context/UserContext';

export default function MobileNavBar() {
  const { user } = useContext(UserContext);
  const [isMobileNavBarOpen, setIsMobileNavBarOpen] = useState(false);

  const handleToggleNavBarOpen = () =>
    setIsMobileNavBarOpen(!isMobileNavBarOpen);
  return (
    <>
      {isMobileNavBarOpen ? (
        <FiX
          className={`${classes['navbar__burgermenu']} ${classes['navbar__burgermenu--close']}`}
          size={'2rem'}
          onClick={handleToggleNavBarOpen}
        />
      ) : (
        <FiMenu
          className={classes['navbar__burgermenu']}
          size={'2rem'}
          onClick={handleToggleNavBarOpen}
        />
      )}

      <nav className={classes['navbar']}>
        <div
          className={`${classes['navbar__section']} ${classes['navbar__section--mobile']}`}
        >
          <Link className={classes['navbar__brand']} to='/trades'>
            APB-Trader
          </Link>
          {isMobileNavBarOpen ? (
            <>
              <motion.div
                className={classes['navbar__list']}
                initial={{ opacity: 0, x: -200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
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
              </motion.div>
              {user ? (
                <motion.div
                  initial={{ opacity: 0, x: -200 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button>Logout</Button>
                </motion.div>
              ) : (
                <motion.div
                  className={classes['navbar__list']}
                  initial={{ opacity: 0, x: -200 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button type='special' onClick={() => console.log('hello')}>
                    Sign up
                  </Button>
                  <Button>Login</Button>
                </motion.div>
              )}
            </>
          ) : null}
        </div>
      </nav>
    </>
  );
}