import NavBarItem from "./NavBarItem";
import styles from "../../styles/components/navigation/NavBar.module.scss";
import { faChartSimple, faDumbbell, faList, faPlus, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useSession, signOut } from "next-auth/react";
import Button from "../_generic/Button";

const NavBar = () => {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            // The user is not authenticated, handle it here.
        },
    });

    return (
        <>
            <ul className={styles.navBar}>
                <NavBarItem label="Log" icon={faList} route="/log" />
                <NavBarItem label="Exercises" icon={faDumbbell} route="/exercises" />
                <NavBarItem label="Stats" icon={faChartSimple} route="/stats" />
                <NavBarItem label="New Workout" icon={faPlus} route="/new-workout" />
            </ul>

            {session?.user?.email && (
                <div className={styles.auth}>
                    <span>Logged in as {session.user.email}</span>
                    <Button
                        icon={faSignOut}
                        danger
                        onClick={() => signOut({ callbackUrl: `${window.location.origin}/login` })}
                    />
                </div>
            )}
        </>
    );
};

export default NavBar;
