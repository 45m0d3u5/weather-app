import React from "react";
import styles from "./style.module.scss";

export const Input = ({onChange, value}) => {
    return (
        <div>
        <input
            className={styles.Input}
            value={value}
            onChange={onChange}
            type="text"
            placeholder="Enter a city"
            aria-label="city"
        />
        </div>
    );
    
}