import classnames from "classnames";
import { ReactElement, useId } from "react";
import styles from "../../styles/components/_generic/Input.module.scss";
import { OptionProps } from "./Select";

type Props = JSX.IntrinsicElements["input"] & {
    isValid?: boolean;
    children?: ReactElement<OptionProps>[];
};

const Input = ({
    type = "text",
    name,
    value,
    disabled = false,
    placeholder,
    min,
    minLength,
    maxLength,
    step,
    size,
    className,
    onChange = () => { },
    isValid = true,
    children,
}: Props) => {
    const datalistId = useId();
    const cx = classnames.bind(styles);

    const classNames: string = cx(
        styles.input,
        { disabled: disabled },
        { invalid: !isValid },
        className
    );

    return (
        <>
            <input
                className={classNames}
                disabled={disabled}
                placeholder={placeholder}
                size={size}
                type={type}
                step={step}
                name={name}
                value={value}
                min={min}
                minLength={minLength}
                maxLength={maxLength}
                list={children && datalistId}
                onChange={(e) => onChange(e)}
            />

            {children && <datalist id={datalistId}>{children}</datalist>}
        </>
    );
};

export default Input;
