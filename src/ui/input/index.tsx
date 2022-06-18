import React, {ChangeEventHandler, FC} from "react";
import styles from "./style.module.scss";

type Props = {
    onChange: ChangeEventHandler<HTMLInputElement>,
    value: string,
}

export const Input: FC<Props> = ({onChange, value}) => {
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