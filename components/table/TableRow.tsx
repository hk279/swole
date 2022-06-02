import { ReactNode, useState } from "react";
import styles from "../../styles/components/table/TableRow.module.scss";
import TableCell from "./TableCell";

interface Props {
    children: ReactNode;
}

const TableRow = ({ children }: Props) => {
    return <tr>{children}</tr>;
};

interface ExpandableProps {
    children: ReactNode;
    cells: ReactNode[];
    expanded?: boolean;
}

TableRow.Expandable = ({ children, cells, expanded = false }: ExpandableProps) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(expanded);

    const handleRowClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <tr className={styles.expandable} onClick={() => handleRowClick()}>
                {cells}
                <TableCell>icon</TableCell>
            </tr>
            {isExpanded && children}
        </>
    );
};

export default TableRow;
