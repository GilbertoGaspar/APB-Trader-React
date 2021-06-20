import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import {
  FIREBASE_TRADE_URL,
  FIREBASE_TRADE_URL_DELETE,
} from '../../firebase/firebase';

import TradeViewModal from './TradeViewModal/TradeViewModal';
import TradeViewCell from './TradeViewCell/TradeViewCell';

import classes from './TradeView.module.scss';
import UserContext from '../../context/UserContext';

class TradeView extends Component {
  static contextType = UserContext;
  state = {
    trades: [],
    searchTerm: '',
    currentUser: '',
    isTradeModalOpen: false,
  };

  componentDidMount() {
    this.getLatestTrades();
  }

  handleToggleTradeModalOpen = () => {
    this.setState({ isTradeModalOpen: !this.state.isTradeModalOpen });
    this.getLatestTrades();
  };

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

  render() {
    const [user] = this.context;
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
    if (user) {
      tradeButton = (
        <button
          type='button'
          className='btn btn-block btn-secondary'
          onClick={this.handleToggleTradeModalOpen}
        >
          Create Trade
        </button>
      );
    }
    return (
      <>
        {this.state.isTradeModalOpen && (
          <TradeViewModal
            closeModalCallback={this.handleToggleTradeModalOpen}
            user={user && user.uid}
          />
        )}
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
          <h6>{user && user.email}</h6>
        </div>
      </>
    );
  }
}

export default TradeView;
