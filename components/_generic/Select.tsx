import { ReactNode } from "react";
import styles from "../../styles/components/_generic/Select.module.scss";

interface Props {
    children: ReactNode;
    label?: string;
    disabled?: boolean;
    searchable?: boolean;
}

const Select = ({ children, label, disabled = false, searchable = false }: Props) => {
    return (
        <>
            {label && (
                <label className={styles.label} htmlFor={label}>
                    {label}
                </label>
            )}

            {searchable ? (
                <>
                    <input className={`${styles.select} ${disabled && styles.disabled}`} disabled={disabled}></input>
                    <datalist>{children}</datalist>
                </>
            ) : (
                <select className={`${styles.select} ${disabled && styles.disabled}`} disabled={disabled}>
                    {children}
                </select>
            )}
        </>
    );
};

interface OptionProps {
    children: ReactNode;
    value: string | number;
    disabled?: boolean;
}

Select.Option = ({ children, value, disabled = false }: OptionProps) => {
    return (
        <option className={styles.option} value={value} disabled={disabled}>
            {children}
        </option>
    );
};

export default Select;
