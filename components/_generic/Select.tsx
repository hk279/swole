import { ChangeEventHandler, ReactNode } from "react";
import styles from "../../styles/components/_generic/Select.module.scss";

interface Props {
    children: ReactNode;
    value?: string | number | undefined;
    label?: string;
    onChange?: ChangeEventHandler<HTMLSelectElement>;
    disabled?: boolean;
}

const Select = ({ children, value, label, onChange = () => {}, disabled = false }: Props) => {
    return (
        <div className={styles.container}>
            {label && (
                <label className={styles.label} htmlFor={label}>
                    {label}
                </label>
            )}

            <select
                value={value}
                onChange={(e) => onChange(e)}
                className={`${styles.select} ${disabled && styles.disabled}`}
                disabled={disabled}
            >
                {children}
            </select>
        </div>
    );
};

export interface OptionProps {
    value: string | number;
    label?: string;
    disabled?: boolean;
}

Select.Option = ({ value, label, disabled = false }: OptionProps) => {
    return <option className={styles.option} value={value} label={label} disabled={disabled} />;
};

export default Select;
