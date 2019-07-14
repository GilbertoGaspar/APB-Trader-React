import React from 'react'
import { Link } from 'react-router-dom'

import classes from './Footer.module.scss'

let Footer = () => {
    return (
        <footer className={`navbar navbar-dark bg-dark ${classes['Footer']}`}>
            <Link className="navbar-brand" to="/trades">APB-Trader</Link>
        </footer>
    )
}

export default Footer;