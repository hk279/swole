import styles from "../../styles/components/_generic/Button.module.scss";
import classnames from "classnames/bind";
import { ReactNode, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

// TODO: Close on click outside

var cx = classnames.bind(styles);

interface Props {
    children: ReactNode;
    text: string;
    primary?: boolean;
    disabled?: boolean;
    size?: "small" | "medium" | "large";
    danger?: boolean;
    success?: boolean;
}

const DropdownButton = ({
    children,
    text,
    primary = false,
    disabled = false,
    size = "medium",
    danger = false,
    success = false,
}: Props) => {
    const buttonClassNames: string = cx(
        "button",
        { primary: primary },
        { secondary: !primary },
        { disabled: disabled },
        { small: size === "small" },
        { large: size === "large" },
        { danger: danger },
        { success: success }
    );

    const [isOpen, setIsOpen] = useState(false);

    const menuClassNames: string = cx(
        styles.dropdownMenu,
        { hideMenu: !isOpen }
    );

    return (
        <div className={styles.dropdown}>
            <button disabled={disabled} className={buttonClassNames} onClick={() => setIsOpen(!isOpen)}>
                {text}
                <FontAwesomeIcon className={styles.dropdownButtonIcon} icon={isOpen ? faChevronUp : faChevronDown} />
            </button>
            <div className={menuClassNames}>{children}</div>
        </div>
    );
};

interface ItemProps {
    children: ReactNode;
    disabled?: boolean;
    size?: "small" | "medium" | "large";
}

DropdownButton.Item = ({ children, disabled = false, size = "medium" }: ItemProps) => {
    const classNames: string = cx(
        "dropdownItem",
        { disabled: disabled },
        { dropdownItemSmall: size === "small" },
        { dropdownItemLarge: size === "large" }
    );

    return <div className={classNames}>{children}</div>;
};

export default DropdownButton;
