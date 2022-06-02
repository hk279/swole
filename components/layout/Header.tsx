import NavBar from "../navigation/NavBar";
import styles from "../../styles/components/layout/Header.module.css";

type Props = {
    title?: string;
};

function Header({ title }: Props) {
    return (
        <div className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            <nav className={styles.nav}>
                <NavBar />
            </nav>
        </div>
    );
}

export default Header;
