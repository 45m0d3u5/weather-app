import React from 'react';
import styles from './style.module.scss';

export const Weather = ({ clouds, wind, humidity}) => {
    return (
        <ul className={styles.weather}>
            <li className={styles.weatherList}>Clouds {clouds}%</li>
            <li className={styles.weatherList}>Humidity {humidity}%</li>
            <li className={styles.weatherList}>Wind {wind} km/h</li>
        </ul>
    )
}