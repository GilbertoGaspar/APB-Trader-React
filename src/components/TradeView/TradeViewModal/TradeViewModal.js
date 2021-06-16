import React, { Component } from 'react';
import axios from 'axios';
import * as $ from 'jquery';

import classes from './TradeViewModal.module.scss';

const FIREBASE_TRADE_URL = 'https://apb-trader.firebaseio.com/trades.json';

export default class TradeViewModal extends Component {
  state = {
    searchTerm: '',
    searchAutoCompleteResults: null,
    validSearchTerm: false,
    submitData: {
      weapon: '',
      price: '',
      time: '24h',
      character: '',
      server: 'Jericho',
      hudImage: null,
      unixTimeCreated: null,
      unixTimeExpires: null,
      userUid: this.props.user,
    },
  };

  timeToUnixTime = (time) => {
    switch (time) {
      case '24h':
        return 86400000;
      case '48h':
        return 172800000;
      default:
        return 86400000;
    }
  };

  handleSubmit = () => {
    //Set userUid to current user's.
    this.handleUpdateSubmitData('userUid', this.props.user);
    //Filters data into a list of empty inputs.
    let hasEmptyData = Object.entries(this.state.submitData).map((data) => {
      let filteredData = data.filter((data) => {
        if (this.state.submitData[data] === '') {
          return true;
        }
        return false;
      });
      return filteredData;
    });
    hasEmptyData = hasEmptyData.filter((data) => {
      return data.length !== 0;
    });

    //Submit data to firebase if validSearchTerm(term picked from drop-down) is true and no empty input fields.
    if (this.state.validSearchTerm && hasEmptyData.length === 0) {
      let updatedSubmitData = this.state.submitData;
      updatedSubmitData['unixTimeCreated'] = Date.now();
      updatedSubmitData['unixTimeExpires'] =
        updatedSubmitData['unixTimeCreated'] +
        this.timeToUnixTime(updatedSubmitData['time']);
      axios
        .post(FIREBASE_TRADE_URL, updatedSubmitData)
        .then((response) => {
          alert('Trade submitted!');
          $('#tradeModalCenter').modal('toggle');
          $('#btn-refresh').click();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert('Input is not valid!');
    }
  };

  //Updates the final data(trade info) that will be sent to the firebase server.
  handleUpdateSubmitData = (name, data) => {
    let updatedSubmitData = this.state.submitData;
    updatedSubmitData[name] = data;
    this.setState({ submitData: updatedSubmitData });

    //Updates searchTerm and clear search results.
    if (name === 'weapon') {
      this.setState({
        searchTerm: data,
        searchAutoCompleteResults: null,
        validSearchTerm: true,
      });
    }
  };

  //Creates a autocomplete section below the weapon choice field.
  handleAutoCompleteChange = (event) => {
    this.setState({ validSearchTerm: false });
    this.setState({ searchTerm: event.target.value }, () => {
      if (this.state.searchTerm === '') {
        this.setState({
          searchAutoCompleteResults: null,
        });
      }

      if (this.state.searchTerm.length >= 2) {
        axios
          .get(
            `https://apbdb.com/beacon/search?q=${this.state.searchTerm}&limit=15&cat=Weapon`
          )
          .then((response) => {
            let tradeableWeapons = response.data.filter((data) => {
              if (data.tradeable === 'Yes') {
                return true;
              }
              return false;
            });

            tradeableWeapons = tradeableWeapons.map((weapon) => {
              return (
                <div
                  key={weapon.sdisplayname}
                  className={classes['auto-complete']}
                  onClick={() => {
                    this.handleUpdateSubmitData('weapon', weapon.sdisplayname);
                    this.handleUpdateSubmitData('hudImage', weapon.hudimage);
                  }}
                >
                  {weapon.sdisplayname}
                </div>
              );
            });

            this.setState({
              searchAutoCompleteResults: tradeableWeapons,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  render() {
    return (
      <div
        className='modal fade'
        id='tradeModalCenter'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='tradeModalCenterTitle'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5
                className={`modal-title ${classes['text-black']}`}
                id='tradeModalLongTitle'
              >
                Create Trade
              </h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className={`modal-body ${classes['text-black']}`}>
              <div className='input-group mb-3'>
                <div className='input-group-prepend'>
                  <span className='input-group-text' id='basic-addon1'>
                    Weapon
                  </span>
                </div>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Weapon Name'
                  aria-label='Weapon Name'
                  aria-describedby='basic-addon1'
                  value={this.state.searchTerm}
                  onChange={this.handleAutoCompleteChange}
                />
              </div>
              {this.state.searchAutoCompleteResults}

              <div className='input-group mb-3'>
                <div className='input-group-prepend'>
                  <span className='input-group-text' id='basic-addon1'>
                    $
                  </span>
                </div>
                <input
                  type='number'
                  className='form-control'
                  placeholder='Price'
                  aria-label='Price'
                  aria-describedby='basic-addon1'
                  onChange={(event) =>
                    this.handleUpdateSubmitData('price', event.target.value)
                  }
                  value={this.state.submitData.price}
                />
              </div>
              <div className='input-group mb-3'>
                <div className='input-group-prepend'>
                  <label
                    className='input-group-text'
                    htmlFor='inputGroupSelect01'
                  >
                    Time
                  </label>
                </div>
                <select
                  className='custom-select'
                  id='inputGroupSelect01'
                  onChange={(event) =>
                    this.handleUpdateSubmitData('time', event.target.value)
                  }
                >
                  <option value='24h' defaultValue>
                    24h
                  </option>
                  <option value='48h'>48h</option>
                </select>
              </div>
              <div className='input-group'>
                <div className='input-group-prepend'>
                  <span className='input-group-text' id=''>
                    Character and Server
                  </span>
                </div>
                <input
                  type='text'
                  placeholder='Name'
                  aria-label='Name'
                  aria-describedby='basic-addon1'
                  className='form-control'
                  onChange={(event) =>
                    this.handleUpdateSubmitData('character', event.target.value)
                  }
                />
                <select
                  className='custom-select'
                  id='inputGroupSelect01'
                  onChange={(event) =>
                    this.handleUpdateSubmitData('server', event.target.value)
                  }
                >
                  <option value='Jericho' defaultValue>
                    Jericho
                  </option>
                  <option value='Citadel'>Citadel</option>
                </select>
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-dismiss='modal'
              >
                Close
              </button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={this.handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
