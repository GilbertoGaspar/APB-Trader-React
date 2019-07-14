import React from 'react'

import classes from './TradeViewCell.module.scss'

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const TradeViewCell = (props) => {
    return (
        <div className={classes['trade-view-cell']}>
            <div className='row'>
                <img className={classes['trade-view-cell__image']} src={props.hudImage} alt={`${props.weapon}`}></img>
            </div>
            <div className={classes['trade-view-cell__row']}>
                <div className={classes['trade-view-cell__header']}>{props.weapon}</div>
                <div>Character: {props.character}</div>
                <div>${numberWithCommas( Math.round(props.price) )}</div>
                <div className={classes['trade-view-cell__text-top-left']}>{props.server}</div>
                <div className={classes['trade-view-cell__text-top-right']}>{props.time}</div>
            </div>
        </div>
    )
}

export default TradeViewCell;