import { ChangeEventHandler, ReactNode } from "react";
import classnames from "classnames/bind";
import styles from "../../styles/components/_generic/Select.module.scss";

const cx = classnames.bind(styles);

interface Props {
  children: ReactNode;
  value?: string | number | undefined;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  disabled?: boolean;
}

export const Select = ({
  children,
  value,
  onChange = () => {},
  disabled = false,
}: Props) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e)}
      className={cx("select", { disabled: disabled })}
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

export const SelectOption = ({
  value,
  label,
  disabled = false,
}: OptionProps) => {
  return <option value={value} label={label} disabled={disabled} />;
};
