import React from 'react'

import classes from './Gallery.module.scss'


export default function Gallery() {
    return (
        <div className={classes['gallery']}>
            <div className={`${classes['gallery__image']} ${classes['gallery__image-1']}`} alt='APB Wallpaper'></div>
            <div className={`${classes['gallery__image']} ${classes['gallery__image-2']}`} alt='APB Wallpaper'></div>
            <div className={`${classes['gallery__image']} ${classes['gallery__image-3']}`} alt='APB Wallpaper'></div>
        </div>
    )
}
