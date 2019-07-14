import React from 'react'
import { Link } from 'react-router-dom'

import classes from './Hero.module.scss'

export default function Hero() {
    return (
        <div className={classes.header}>
            <div className={classes['header-text']}>
                <div className={classes['header-text-main']}>
                    APB Trader
                </div>
                <div className={classes['header-text-sub']}>
                    trading made easy
                </div>
                <Link className={classes['header-button']} to='/trades'>
                    Join Now
                </Link>
            </div>
        </div>
    )
}
