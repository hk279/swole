import { ReactNode } from "react";
import styles from "../../styles/components/table/TableRow.module.scss";

interface Props {
    children?: ReactNode;
    header?: boolean;
}

const TableRow = ({ children, header = false }: Props) => {
    if (header) return <tr className={styles.headerRow}>{children}</tr>;
    return <tr className={styles.tableRow}>{children}</tr>;
};

export default TableRow;
