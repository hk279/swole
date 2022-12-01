import styles from "../../styles/components/_generic/Button.module.scss";
import classnames from "classnames/bind";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

    return (
        <button disabled={disabled} className={classNames} onClick={onClick}>
            {icon && (
                <FontAwesomeIcon
                    className={`${!iconOnly ? styles.buttonIconWithText : styles.buttonIconWithoutText}`}
                    icon={icon}
                    size={size === "large" ? "lg" : "1x"}
                />
            )}
            {text}
        </button>
    );
};

export default Button;
