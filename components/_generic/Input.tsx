import styles from "../../styles/components/_generic/Input.module.css";

type Props = {
    label: string;
    type: "text" | "number";
    disabled?: boolean;
};

const Input = ({ label, type, disabled = false }: Props) => {
    return (
        <>
            <span className={styles.label}>{label}:</span>
            <input disabled={disabled} type={type}></input>
        </>
    );
};

export default Input;
