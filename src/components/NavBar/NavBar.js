import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';

export default function NavBar() {
  const { user } = useContext(UserContext);
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <Link className='navbar-brand' to='/trades'>
        APB-Trader
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>

      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <Link className='nav-link' to='/'>
              Home
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/trades'>
              Trades
            </Link>
          </li>
        </ul>

        {user ? (
          <button>Logout</button>
        ) : (
          <div>
            <button
              className='btn btn-outline-success my-2 my-sm-0'
              data-toggle='modal'
              data-target='#loginModalCenter'
            >
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
