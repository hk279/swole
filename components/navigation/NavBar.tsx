import NavBarItem from "./NavBarItem";
import styles from "../../styles/components/navigation/NavBar.module.css";
import { faChartSimple, faDumbbell, faList, faPlus } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
    return (
        <>
            <ul className={styles.navBar}>
                <NavBarItem label="Log" icon={faList} route="/Log" />
                <NavBarItem label="Exercises" icon={faDumbbell} route="/Exercises" />
                <NavBarItem label="Stats" icon={faChartSimple} route="/Stats" />
                <NavBarItem label="New Workout" icon={faPlus} route="/NewWorkout" />
            </ul>
        </>
    );
};

export default NavBar;
