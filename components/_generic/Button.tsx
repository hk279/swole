import styles from "../../styles/components/_generic/Button.module.scss";
import classnames from "classnames/bind";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface Props {
  text?: string;
  icon?: IconDefinition;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => any;
  primary?: boolean;
  link?: boolean;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  danger?: boolean;
  success?: boolean;
  isLoading?: boolean;
}

const Button = ({
  text,
  icon,
  className,
  onClick,
  primary = false,
  link = false,
  disabled = false,
  size = "medium",
  danger = false,
  success = false,
  isLoading = false,
}: Props) => {
  const cx = classnames.bind(styles);

  const iconOnly = icon != null && text == null;

  const classNames: string = cx(
    styles.button,
    { primary: primary },
    { secondary: !primary && !link },
    { link: link },
    { disabled: disabled },
    { small: size === "small" },
    { large: size === "large" },
    { danger: danger },
    { success: success },
    { iconOnly: iconOnly },
    className
  );

  const getSpinner = () => {
    return (
      <FontAwesomeIcon
        className={`${
          !iconOnly ? styles.buttonIconWithText : styles.buttonIconWithoutText
        }`}
        icon={faSpinner}
        spin
        size={size === "large" ? "lg" : "1x"}
      />
    );
  };

  return (
    <button disabled={disabled} className={classNames} onClick={onClick}>
      {isLoading && getSpinner()}
      {icon && !isLoading && (
        <FontAwesomeIcon
          className={`${
            !iconOnly ? styles.buttonIconWithText : styles.buttonIconWithoutText
          }`}
          icon={icon}
          size={size === "large" ? "lg" : "1x"}
          width={16}
        />
      )}
      {text}
    </button>
  );
};

export default Button;
