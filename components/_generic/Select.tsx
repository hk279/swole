import { ChangeEventHandler, ReactNode } from "react";
import styles from "../../styles/components/_generic/Select.module.scss";

interface Props {
    children: ReactNode;
    value?: string | number | undefined;
    onChange?: ChangeEventHandler<HTMLSelectElement>;
    disabled?: boolean;
}

export const Select = ({ children, value, onChange = () => { }, disabled = false }: Props) => {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e)}
            className={`${styles.select} ${disabled && styles.disabled}`}
            disabled={disabled}
        >
            {children}
        </select>
    );
};

export interface OptionProps {
    value: string | number;
    label?: string;
    disabled?: boolean;
}

export const SelectOption = ({ value, label, disabled = false }: OptionProps) => {
    return <option className={styles.option} value={value} label={label} disabled={disabled} />;
};
