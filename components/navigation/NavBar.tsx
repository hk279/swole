import NavBarItem from "./NavBarItem";
import styles from "../../styles/components/navigation/NavBar.module.css";

const NavBar = () => {
    return (
        <>
            <ul className={styles.navBar}>
                <NavBarItem label="Log" route="/log" />
                <NavBarItem label="Exercises" route="/exercises" />
                <NavBarItem label="Stats" route="/stats" />
                <NavBarItem label="New Workout" route="/workout" />
            </ul>
        </>
    );
};

export default NavBar;
