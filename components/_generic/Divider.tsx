import styles from "../../styles/components/_generic/Divider.module.scss";

interface Props {
    variant?: "thin" | "default" | "thick";
}

const Divider = ({ variant = "default" }: Props) => {
    return (
        <hr
            className={`${styles.divider} ${variant === "thin" && styles.thin} ${variant === "thick" && styles.thick}`}
        />
    );
};

export default Divider;
