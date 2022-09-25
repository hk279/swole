import TabNavItem from "./TabNavItem";
import styles from "../../styles/components/navigation/TabNav.module.scss";

const NavBar = () => {
    return (
        <ul className={styles.tabNav}>
            <TabNavItem label="Log" route="/log" />
            <TabNavItem label="Exercises" route="/exercises" />
            <TabNavItem label="Stats" route="/stats" />
            <TabNavItem label="New Workout" route="/workout" />
        </ul>
    );
};

export default NavBar;
