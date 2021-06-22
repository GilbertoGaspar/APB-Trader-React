import React from 'react';

import classes from './TradeViewCell.module.scss';

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const TradeViewCell = ({
  hudImage,
  weapon,
  character,
  price,
  server,
  time,
}) => {
  return (
    <div className={classes['cell']}>
      <div className={classes['cell__upper']}>
        <div className={classes['cell__upper--left']}>
          <div className={classes['cell__container--img']}>
            <img
              className={classes['cell__img']}
              alt={`${weapon} symbol`}
              src={hudImage}
            />
          </div>
        </div>
        <div className={classes['cell__upper--right']}>
          <h1 className={classes['cell__title']}>{weapon}</h1>
          <h2 className={classes['cell__subtitle']}>
            ${numberWithCommas(Math.round(price))}
          </h2>
        </div>
      </div>
      <div className={classes['cell__lower']}>
        <div className={classes['cell__lower--left']}>
          <div className={classes['cell__box']}>{server}</div>
          <div className={classes['cell__box']}>{character}</div>
        </div>
        <div className={classes['cell__lower--right']}>
          <div className={classes['cell__box']}>{`Exp: ${time}`}</div>
        </div>
      </div>
    </div>
  );
};

export default TradeViewCell;
