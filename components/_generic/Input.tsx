import { ChangeEvent, ChangeEventHandler } from "react";
import styles from "../../styles/components/_generic/Input.module.scss";

interface Props {
    label?: string;
    type?: "text" | "number";
    name?: string;
    value?: string | number | undefined;
    disabled?: boolean;
    placeholder?: string;
    minLength?: number;
    maxLength?: number;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Input = ({
    label,
    type = "text",
    name,
    value,
    disabled = false,
    placeholder,
    minLength,
    maxLength,
    onChange = () => {},
}: Props) => {
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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        validateLength(e);
        onChange(e);
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
                name={name}
                value={value}
                onChange={(e) => handleChange(e)}
            ></input>
        </>
    );
};

export default Input;
