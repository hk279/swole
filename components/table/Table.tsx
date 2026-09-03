import { ReactNode } from "react";
import classnames from "classnames/bind";
import styles from "../../styles/components/table/Table.module.scss";

const cx = classnames.bind(styles);

interface Props {
    children: ReactNode | ReactNode[];
    borderless?: boolean;
    tableStyle?: "loose" | "condensed";
}

const Table = ({ children, borderless = false, tableStyle = "loose" }: Props) => {
    const cssClasses = cx("table", { borderless: borderless }, tableStyle);

    return (
        <table className={cssClasses}>
            <tbody>{children}</tbody>
        </table>
    );
};

export default Table;
