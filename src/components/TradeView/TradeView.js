import React, { Component } from 'react';
import axios from 'axios';
import * as $ from 'jquery';
import moment from 'moment';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

import TradeViewModal from './TradeViewModal/TradeViewModal';
import TradeViewCell from './TradeViewCell/TradeViewCell';
import LoginModal from '../LoginModal/LoginModal';

import classes from './TradeView.module.scss';

var firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

firebase.initializeApp(firebaseConfig);

const FIREBASE_TRADE_URL = '';
const FIREBASE_TRADE_URL_DELETE = '';

class TradeView extends Component {
  state = {
    trades: [],
    searchTerm: '',
    currentUser: '',
  };

  componentDidMount() {
    this.getLatestTrades();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ currentUser: user });
      } else {
        this.setState({ currentUser: '' });
      }
    });
  }

  //Deletes an array of trades from database
  deleteOldTradesFromDataBase = (trades) => {
    trades.forEach((tradeKey) => {
      axios
        .delete(`${FIREBASE_TRADE_URL_DELETE}${tradeKey}.json`)
        .catch((error) => console.log(error))
        .finally(() => {
          this.handleUpdateTrades();
        });
    });
  };

  //Deletes old(expired) trades and fetch new trades.
  getLatestTrades = () => {
    axios
      .get(FIREBASE_TRADE_URL)
      .then((response) => {
        let oldTrades = Object.keys(response.data).filter((trade) => {
          if (response.data[trade]['unixTimeExpires'] <= Date.now()) {
            return true;
          }
          return false;
        });
        //Delete Old Trades from database once state is set.
        if (oldTrades.length !== 0) {
          this.setState({ oldTrades: oldTrades }, () =>
            this.deleteOldTradesFromDataBase(this.state.oldTrades)
          );
        } else {
          this.handleUpdateTrades();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Updates state with current database of trades.
  handleUpdateTrades = () => {
    axios
      .get(FIREBASE_TRADE_URL)
      .then((response) => {
        this.setState({ trades: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleSearchTermChanger = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleRegister = (email, pass) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then((response) => {
        alert('You have been registered!');
        $('#loginModalCenter').modal('toggle');
      })
      .catch(function (error) {
        alert(error);
      });
  };

  handleLogin = (email, pass) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then((response) => {
        alert('You have logged in!');
        $('#loginModalCenter').modal('toggle');
      })
      .catch(function (error) {
        alert(error);
      });
  };

  handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        alert('You have logged out!');
        $('#loginModalCenter').modal('toggle');
      })
      .catch((error) => {
        alert(error);
      });
  };

  render() {
    let tradeButton = <h6>Please login/register to create a trade!</h6>;
    let trades = <h6>No current trades!</h6>;
    //If trades data is not null create trades display section.
    if (this.state.trades !== null) {
      //If searchTerm is empty show all current trades.
      if (this.state.searchTerm === '') {
        //Create and display TradeViewCell per trade.
        trades = Object.entries(this.state.trades).map((trade) => {
          const {
            character,
            hudImage,
            price,
            server,
            unixTimeExpires,
            weapon,
          } = trade[1];
          let time = moment().to(unixTimeExpires, true);
          return (
            <TradeViewCell
              key={trade[0]}
              character={character}
              hudImage={hudImage}
              price={price}
              server={server}
              time={time}
              weapon={weapon}
            />
          );
        });
      } else {
        //Filters trades to find out if they contain the searchTerm then display it.
        trades = Object.entries(this.state.trades).filter((trade) => {
          return trade[1].weapon
            .toLowerCase()
            .includes(this.state.searchTerm.toLowerCase());
        });
        //Create and display TradeViewCell per trade.
        trades = trades.map((trade) => {
          const { character, hudImage, price, server, time, unixTime, weapon } =
            trade[1];
          return (
            <TradeViewCell
              key={trade[0]}
              character={character}
              hudImage={hudImage}
              price={price}
              server={server}
              time={time}
              unixTime={unixTime}
              weapon={weapon}
            />
          );
        });
      }
    }

    //Display create trade button if user is logged in.
    if (this.state.currentUser) {
      tradeButton = (
        <button
          type='button'
          className='btn btn-block btn-secondary'
          data-toggle='modal'
          data-target='#tradeModalCenter'
        >
          Create Trade
        </button>
      );
    }
    return (
      <div className={classes['TradeView']}>
        <button
          className={`btn btn-secondary ${classes['TradeView__button']}`}
          id='btn-refresh'
          type='button'
          onClick={this.getLatestTrades}
        >
          Refresh
        </button>
        <h3>Current Trades</h3>
        {trades}
        <input
          type='text'
          className='form-control mb-2'
          placeholder='Weapon Search'
          aria-label='Weapon Search'
          aria-describedby='basic-addon1'
          onChange={(event) => this.handleSearchTermChanger(event)}
        />
        {tradeButton}
        <TradeViewModal user={this.state.currentUser.uid} />
        <LoginModal
          register={this.handleRegister}
          login={this.handleLogin}
          logout={this.handleLogout}
          currentUser={this.state.currentUser}
        />
        <h6>{this.state.currentUser.email}</h6>
      </div>
    );
  }
}

export default TradeView;
