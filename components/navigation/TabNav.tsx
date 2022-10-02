import TabNavItem from "./TabNavItem";
import styles from "../../styles/components/navigation/TabNav.module.scss";
import { faChartSimple, faDumbbell, faList, faPlus } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
    return (
        <ul className={styles.tabNav}>
            <TabNavItem icon={faList} route="/log" />
            <TabNavItem icon={faDumbbell} route="/exercises" />
            <TabNavItem icon={faChartSimple} route="/stats" />
            <TabNavItem icon={faPlus} route="/new-workout" />
        </ul>
    );
};

export default NavBar;
