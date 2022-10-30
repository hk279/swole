import { ReactNode } from "react";
import styles from "../../styles/components/table/Table.module.scss";

interface Props {
    children: ReactNode | ReactNode[];
    borderless?: boolean;
    tableStyle?: "loose" | "condensed";
}

const Table = ({ children, borderless = false, tableStyle = "loose" }: Props) => {
    const cssClasses = `${styles.table} ${borderless && styles.borderless} ${styles[tableStyle]}`;

    return (
        <table className={cssClasses}>
            <tbody>{children}</tbody>
        </table>
    );
};

export default Table;
