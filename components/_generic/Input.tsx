import { ChangeEvent } from "react";
import styles from "../../styles/components/_generic/Input.module.scss";

interface Props {
    label?: string;
    type?: "text" | "number";
    disabled?: boolean;
    placeholder?: string;
    minLength?: number;
    maxLength?: number;
}

const Input = ({ label, type = "text", disabled = false, placeholder, minLength, maxLength }: Props) => {
    const validateLength = (e: ChangeEvent<HTMLInputElement>) => {
        const value: string | null = e.target.value;

        e.target.classList.remove(styles.invalid);

        if (minLength != null && value != null) {
            if (value.length < minLength) {
                e.target.classList.add(styles.invalid);
            }
        }

        if (maxLength != null && value != null) {
            if (value.length > maxLength) {
                e.target.classList.add(styles.invalid);
            }
        }
    };

    return (
        <>
            {label && (
                <label className={styles.label} htmlFor={label}>
                    {label}
                </label>
            )}
            <input
                className={`${styles.input} ${disabled && styles.disabled}`}
                disabled={disabled}
                placeholder={placeholder}
                type={type}
                name={label}
                onChange={(e) => validateLength(e)}
            ></input>
        </>
    );
};

export default Input;
