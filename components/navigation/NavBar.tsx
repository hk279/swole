import NavBarItem from "./NavBarItem";
import styles from "../../styles/components/navigation/NavBar.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../login/LogoutButton";
import LoginButton from "../login/LoginButton";

const NavBar = () => {
    const { isAuthenticated } = useAuth0();

    return (
        <>
            <ul className={styles.navBar}>
                <NavBarItem label="Log" route="/log" />
                <NavBarItem label="Excercises" route="/excercises" />
                <NavBarItem label="Stats" route="/stats" />
            </ul>
            <span className={styles.navBarActions}>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</span>
        </>
    );
};

export default NavBar;
