import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import classes from './Layout.module.scss'

import Index from './Index/Index'
import Trades from './Trades/Trades'


export default function Layout() {
    return (
        <div className={classes['container-layout']}>
                <Router>
                        <Route path="/" exact component={Index} />
                        <Route path="/trades/" component={Trades} />
                </Router>
        </div>
    )
}
