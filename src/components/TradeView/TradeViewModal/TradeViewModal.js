import React, { Component } from 'react';
import axios from 'axios';

import Modal from '../../Modal/Modal';
import Button from '../../Button/Button';

import classes from './TradeViewModal.module.scss';

import { FIREBASE_TRADE_URL } from '../../../firebase/firebase';

export default class TradeViewModal extends Component {
  state = {
    searchTerm: '',
    searchAutoCompleteResults: null,
    validSearchTerm: false,
    errorMsg: '',
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

  handleCloseModal = () => {
    this.setState({
      searchTerm: '',
      searchAutoCompleteResults: null,
      validSearchTerm: false,
      errorMsg: '',
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
    });
    this.props.closeModalCallback();
  };

  handleSubmit = (e) => {
    e.preventDefault();
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
        .then((res) => {
          alert('Trade submitted!');
          this.handleCloseModal();
        })
        .catch(({ message }) => {
          this.setState({ errorMsg: message });
        });
    } else {
      this.setState({
        errorMsg: 'Weapon Name invalid, please pick from the autocomplete.',
      });
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
            `https://api.apbdb.com/beacon/search?query=${this.state.searchTerm}&limit=15&cat=Weapon`
          )
          .then((response) => {

            let tradeableWeapons = response.data.items.filter((data) => {
                return true;
            });

            console.log(tradeableWeapons);

            tradeableWeapons = tradeableWeapons.map((weapon) => {
              return (
                <div
                  key={weapon.sDisplayName}
                  className={classes['auto-complete-item']}
                  onClick={() => {
                    this.handleUpdateSubmitData('weapon', weapon.sDisplayName);
                    this.handleUpdateSubmitData('hudImage', 'https://cdn.apbdb.com/img/apbmenus_art_weapons/icon_assaultrifle_ntec.webp');
                  }}
                >
                  {weapon.sDisplayName}
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
      } else {
        this.setState({
              searchAutoCompleteResults: [],
            });
          }
    });
  };

  render() {
    return (
      <Modal closeModalCallback={this.handleCloseModal}>
        <h2 className={classes['modal__title']}>Create Trade!</h2>
        <hr />
        <form
          id='weapon-form'
          className={classes['modal__content']}
          onSubmit={this.handleSubmit}
        >
          <label
            className={`${classes['modal__inputgroup']} ${classes['modal__inputgroup--autocomplete']}`}
            htmlFor='weapon'
          >
            Weapon Name
            <input
              id='weapon'
              className={classes['modal__input']}
              name='weapon'
              required
              value={this.state.searchTerm}
              onChange={this.handleAutoCompleteChange}
              placeholder={`Weapon Name Ex: OCA Nano 'Connoisseur'`}
            />
            <div style={{ position: 'relative', width: '100%' }}>
            <div className={classes['auto-complete']}>
            {this.state.searchAutoCompleteResults}
            </div>
            </div>
          </label>
          <label className={classes['modal__inputgroup']} htmlFor='price'>
            Price
            <input
              id='price'
              className={classes['modal__input']}
              name='price'
              type='number'
              required
              onChange={(event) =>
                this.handleUpdateSubmitData('price', event.target.value)
              }
              value={this.state.submitData.price}
              placeholder='Price'
            />
          </label>
          <label className={classes['modal__inputgroup']} htmlFor='time'>
            Time
            <select
              id='time'
              className={`${classes['modal__input']} ${classes['modal__input--select']}`}
              onChange={(event) =>
                this.handleUpdateSubmitData('time', event.target.value)
              }
              defaultValue=''
              required
            >
              <option value='' disabled hidden>
                Time Expiration
              </option>
              <option value='24h'>24h</option>
              <option value='48h'>48h</option>
            </select>
          </label>
          <label className={classes['modal__inputgroup']} htmlFor='character'>
            Character Name
            <input
              id='character'
              className={classes['modal__input']}
              name='character'
              required
              onChange={(event) =>
                this.handleUpdateSubmitData('character', event.target.value)
              }
              value={this.state.submitData.character}
              placeholder='Character Name'
            />
          </label>
          <label className={classes['modal__inputgroup']} htmlFor='server'>
            Server Name
            <select
              id='server'
              className={`${classes['modal__input']} ${classes['modal__input--select']}`}
              onChange={(event) =>
                this.handleUpdateSubmitData('server', event.target.value)
              }
              defaultValue=''
              required
            >
              <option value='' disabled hidden>
                Server Name
              </option>
              <option value='Jericho'>Jericho</option>
              <option value='Citadel'>Citadel</option>
            </select>
          </label>
          {this.state.errorMsg && (
            <div style={{ color: 'red' }}>{this.state.errorMsg}</div>
          )}
        </form>
        <hr />
        <div className={classes['modal__bottom']}>
          <Button onClick={this.handleCloseModal}>Close</Button>
          <Button variant='special' type='submit' form='weapon-form'>
            Submit
          </Button>
        </div>
      </Modal>
    );
  }
}
