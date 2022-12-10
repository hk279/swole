import classnames from "classnames";
import { ChangeEvent, ReactElement, useId, useState } from "react";
import styles from "../../styles/components/_generic/Input.module.scss";
import { OptionProps } from "./Select";

type Props = JSX.IntrinsicElements["input"] & {
    isValid?: boolean;
    children?: ReactElement<OptionProps>[];
};

const Input = ({
    required,
    type = "text",
    name,
    value,
    disabled = false,
    placeholder,
    min,
    minLength,
    maxLength,
    step,
    className,
    onChange = () => { },
    onClick = () => { },
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

    const [controlledValue, setControlledValue] = useState(value);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setControlledValue(e.target.value);
        onChange(e);
    };

    return (
        <>
            <input
                className={classNames}
                value={controlledValue}
                required={required}
                disabled={disabled}
                placeholder={placeholder}
                type={type}
                step={step}
                name={name}
                min={min}
                minLength={minLength}
                maxLength={maxLength}
                list={children && datalistId}
                onChange={e => handleChange(e)}
                onClick={e => onClick(e)}
            />

            {children && <datalist id={datalistId}>{children}</datalist>}
        </>
    );
};

export default Input;
