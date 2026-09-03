import classnames from "classnames/bind";
import { ChangeEvent, ComponentPropsWithoutRef, ReactElement, useId } from "react";
import styles from "../../styles/components/_generic/Input.module.scss";
import { OptionProps } from "./Select";

const cx = classnames.bind(styles);

type Props = ComponentPropsWithoutRef<"input"> & {
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
  onChange = () => {},
  onClick = () => {},
  isValid = true,
  children,
}: Props) => {
  const datalistId = useId();

  const classNames: string = cx(
    "input",
    { disabled: disabled },
    { invalid: !isValid },
    className
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <>
      <input
        className={classNames}
        value={value?.toString() ?? ""}
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
        onChange={(e) => handleChange(e)}
        onClick={(e) => onClick(e)}
      />

      {children && <datalist id={datalistId}>{children}</datalist>}
    </>
  );
};

export default Input;
