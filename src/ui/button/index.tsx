import React, {FC, MouseEventHandler} from "react";
import styles from "./style.module.scss";

type Props = {
    onClick: MouseEventHandler<HTMLButtonElement>
}

export const Button: FC<Props> = ({onClick}) => {
    return (
        <button className={styles.button} onClick={onClick}>
            <i className="fas fa-search"></i>
        </button>
    );
}