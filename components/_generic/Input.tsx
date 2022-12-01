import classnames from "classnames";
import { ChangeEvent, ReactElement, useId } from "react";
import styles from "../../styles/components/_generic/Input.module.scss";
import { OptionProps } from "./Select";

type Props = JSX.IntrinsicElements["input"] & {
    minLength?: number;
    maxLength?: number;
    children?: ReactElement<OptionProps>[];
};

const Input = ({
    type = "text",
    name,
    value,
    disabled = false,
    placeholder,
    minLength,
    maxLength,
    size,
    children,
    className,
    onChange = () => { },
}: Props) => {
    const datalistId: string = useId();
    const cx = classnames.bind(styles);

    const classNames: string = cx(
        styles.input,
        { disabled: disabled },
        className
    );

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
            <input
                className={classNames}
                disabled={disabled}
                placeholder={placeholder}
                size={size}
                type={type}
                name={name}
                value={value}
                list={children && datalistId}
                onChange={(e) => handleChange(e)}
            />

            {children && <datalist id={datalistId}>{children}</datalist>}
        </>
    );
};

export default Input;
