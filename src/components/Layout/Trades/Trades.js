import React from 'react';

import NavBar from '../../NavBar/NavBar';
import TradeView from '../../TradeView/TradeView';
import Background from '../../Background/Background'

import { UserProvider } from '../../../context/UserContext';

export default function Trades() {
  return (
    <React.Fragment>
      <UserProvider>
        <NavBar />
        <TradeView />
        <Background />
      </UserProvider>
    </React.Fragment>
  );
}
