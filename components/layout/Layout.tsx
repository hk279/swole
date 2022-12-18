import { ReactNode } from "react";
import Header from "./Header";
import styles from "../../styles/components/layout/Layout.module.scss";

type Props = {
    pageTitle?: string;
    children?: ReactNode;
};

const Layout = ({ pageTitle, children }: Props) => {
    return (
        <div style={{ minHeight: "100vh" }}>
            <Header title={pageTitle} />
            <div className={styles.pageContent}>{children}</div>
        </div>
    );
};

export default Layout;
