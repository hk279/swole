import classnames from "classnames/bind";
import styles from "../../styles/components/_generic/Divider.module.scss";

const cx = classnames.bind(styles);

interface Props {
    variant?: "thin" | "default" | "thick";
}

const Divider = ({ variant = "default" }: Props) => {
    return (
        <hr
            className={cx("divider", {
                thin: variant === "thin",
                thick: variant === "thick",
            })}
        />
    );
};

export default Divider;
