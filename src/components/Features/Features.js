import React from 'react'

import classes from './Features.module.scss'
import Gallery from '../Gallery/Gallery';

export default function Features() {
    return (
        <div className={classes.features}>
            <h4 className={classes.header}>Why use APB Trader?</h4>
            <div className="container">
                <div className="row">
                    <div className={`col-sm ${classes["article"]}`}>
                        <div className={classes["article-text-primary"]}>
                            Easy to manage trading system
                        </div>
                        <div className={`${classes["article-text-sub"]} mb-3`}>
                            Simple UI to create, find, and connect with fellow traders.
                        </div>
                        <div className={classes["article-text-primary"]}>
                            Friendly trading environment
                        </div>
                        <div className={`${classes["article-text-sub"]} mb-3`}>
                            Small community of well-known traders.
                        </div>
                        <div className={classes["article-text-primary"]}>
                            Fair prices
                        </div>
                        <div className={`${classes["article-text-sub"]} mb-3`}>
                            Find prices that only APB-Trader can offer.
                        </div>
                    </div>
                    <div className="col-sm">
                        <Gallery />
                    </div>
                </div>
            </div>
        </div>
    )
}
