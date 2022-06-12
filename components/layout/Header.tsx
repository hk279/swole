import NavBar from "../navigation/NavBar";
import TabNav from "../navigation/TabNav";
import styles from "../../styles/components/layout/Header.module.css";
import useViewport from "../../hooks/useViewport";

type Props = {
    title?: string;
};

function Header({ title }: Props) {
    const width: number = useViewport();
    const breakpoint: number = 600;

    return (
        <>
            <div className={styles.header}>
                <h1 className={styles.title}>{title}</h1>
                {width > breakpoint && <NavBar />}
            </div>
            {width <= breakpoint && <TabNav />}
        </>
    );
}

export default Header;
