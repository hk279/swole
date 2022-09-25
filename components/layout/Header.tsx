import NavBar from "../navigation/NavBar";
import TabNav from "../navigation/TabNav";
import styles from "../../styles/components/layout/Header.module.scss";
import useViewport from "../../hooks/useViewport";

type Props = {
    title?: string;
};

function Header({ title }: Props) {
    const width: number = useViewport();
    const BREAKPOINT: number = 800;

    return (
        <>
            <div className={styles.header}>
                <h1 className={styles.title}>{title}</h1>
                {width > BREAKPOINT && <NavBar />}
            </div>
            {width <= BREAKPOINT && <TabNav />}
        </>
    );
}

export default Header;
