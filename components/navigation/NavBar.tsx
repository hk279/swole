import NavBarItem from "./NavBarItem";
import styles from "../../styles/components/navigation/NavBar.module.css";

const NavBar = () => {
    return (
        <ul className={styles.navBar}>
            <NavBarItem label="Log" route="/log" />
            <NavBarItem label="Excercises" route="/excercises" />
            <NavBarItem label="Stats" route="/stats" />
        </ul>
    );
};

export default NavBar;
