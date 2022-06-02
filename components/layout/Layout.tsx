import { ReactNode } from "react";
import Header from "./Header";
import styles from "../../styles/components/layout/Layout.module.css";

type Props = { pageTitle: string; children?: ReactNode };

const Layout = ({ pageTitle, children }: Props) => {
    return (
        <div>
            <Header title={pageTitle} />
            <div className={styles.pageContent}>{children}</div>
        </div>
    );
};

export default Layout;
