import NavItem from "./NavItem";
import styles from "../../styles/components/navigation/NavBar.module.css";

function NavBar() {
    return (
        <ul className={styles.navBar}>
            <NavItem label="Log" route="/log" />
            <NavItem label="Excercises" route="/excercises" />
            <NavItem label="Stats" route="/stats" />
        </ul>
    );
}

export default NavBar;
