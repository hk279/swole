import { ReactNode } from "react";
import styles from "../../styles/components/table/Table.module.scss";

interface Props {
    children: ReactNode[];
    borderless?: boolean;
}

const Table = ({ children, borderless = false }: Props) => {
    return <table className={`${styles.table} ${borderless && styles.borderless}`}>{children}</table>;
};

export default Table;
