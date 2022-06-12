import TabNavItem from "./TabNavItem";
import styles from "../../styles/components/navigation/TabNav.module.scss";

const NavBar = () => {
    return (
        <ul className={styles.tabNav}>
            <TabNavItem label="Log" route="/log" />
            <TabNavItem label="Excercises" route="/excercises" />
            <TabNavItem label="Stats" route="/stats" />
        </ul>
    );
};

export default NavBar;
