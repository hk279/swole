import { ReactNode } from "react";
import styles from "../../styles/components/table/TableCell.module.scss";

interface Props {
    children: ReactNode;
    colSpan?: number;
}

const TableCell = ({ children, colSpan = 1 }: Props) => {
    return (
        <td colSpan={colSpan} className={styles.cell}>
            {children}
        </td>
    );
};

export default TableCell;
