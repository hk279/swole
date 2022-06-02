import { ReactNode } from "react";
import styles from "../../styles/components/_generic/Modal.module.css";

type Props = {
    title: string;
    actions: ReactNode[];
    children: ReactNode;
};

function Modal({ title, actions, children }: Props) {
    return (
        <div className={styles.modal}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h2>{title}</h2>
                </div>

                <div className={styles.body}>{children}</div>

                <div className={styles.footer}>{actions}</div>
            </div>
        </div>
    );
}

export default Modal;
