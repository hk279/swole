import { ReactNode } from "react";
import styles from "../../styles/components/table/TableCell.module.scss";

interface Props {
    children: ReactNode;
    colSpan?: number;
    cellType?: "text" | "number" | "action";
}

const TableCell = ({ children, colSpan = 1, cellType = "text" }: Props) => {
    return (
        <td colSpan={colSpan} className={`${styles.cell} ${cellType}`}>
            {children}
        </td>
    );
};

export default TableCell;
