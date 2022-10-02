import { ChangeEvent, ChangeEventHandler, ReactElement, useId } from "react";
import styles from "../../styles/components/_generic/Input.module.scss";
import { OptionProps } from "./Select";

interface Props {
    label?: string;
    type?: "text" | "number" | "email" | "password";
    name?: string;
    value?: string | number | undefined;
    disabled?: boolean;
    placeholder?: string;
    minLength?: number;
    maxLength?: number;
    children?: ReactElement<OptionProps>[];
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
    children,
    onChange = () => {},
}: Props) => {
    const datalistId: string = useId();

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
        <div className={styles.container}>
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
                list={children && datalistId}
                onChange={(e) => handleChange(e)}
            />

            {children && <datalist id={datalistId}>{children}</datalist>}
        </div>
    );
};

export default Input;
