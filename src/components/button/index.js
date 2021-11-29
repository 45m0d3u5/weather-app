import React from "react";
import styles from "./style.module.scss";

export const Button = ({onClick}) => {
    return (

        <button className={styles.button} onClick={onClick}>
            <i class="fas fa-search"></i>
        </button>
    );
}