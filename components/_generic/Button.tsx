import styles from "../../styles/components/_generic/Button.module.scss";
import classnames from "classnames/bind";

type Props = {
    text: string;
    primary?: boolean;
    disabled?: boolean;
    size?: "small" | "medium" | "large";
    danger?: boolean;
    success?: boolean;
};

function Button({ text, primary = false, disabled = false, size = "medium", danger = false, success = false }: Props) {
    var cx = classnames.bind(styles);

    const classNames: string = cx(
        "button",
        { primary: primary },
        { secondary: !primary },
        { disabled: disabled },
        { small: size === "small" },
        { large: size === "large" },
        { danger: danger },
        { success: success }
    );

    return (
        <button disabled={disabled} className={classNames}>
            {text}
        </button>
    );
}

export default Button;
