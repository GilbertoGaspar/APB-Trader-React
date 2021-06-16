import React from 'react';

import NavBar from '../../NavBar/NavBar';
import TradeView from '../../TradeView/TradeView';

import { UserProvider } from '../../../context/UserContext';

export default function Trades() {
  return (
    <React.Fragment>
      <UserProvider>
        <NavBar />
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-sm col-lg-8 col-xl-8 text-center'>
              <TradeView />
            </div>
          </div>
        </div>
      </UserProvider>
    </React.Fragment>
  );
}
