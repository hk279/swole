import NavBar from "../navigation/NavBar";
import TabNav from "../navigation/TabNav";
import styles from "../../styles/components/layout/Header.module.scss";
import useViewport from "../../hooks/useViewport";
import { signOut, useSession } from "next-auth/react";
import Button from "../_generic/Button";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

interface Props {
    title?: string;
}

const Header = ({ title }: Props) => {
    const width = useViewport();
    const TAB_NAV_BREAKPOINT = 1200;

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            // The user is not authenticated, handle it here.
        },
    });

    return (
        <>
            <div className={styles.header}>
                <h1 className={styles.title}>{title}</h1>

                {width > TAB_NAV_BREAKPOINT && <NavBar />}

                {session?.user?.email && (
                    <div className={styles.auth}>
                        {session.user.email}
                        <Button
                            icon={faSignOut}
                            danger
                            onClick={() => signOut({ callbackUrl: `${window.location.origin}/login` })}
                        />
                    </div>
                )}
            </div>

            {width <= TAB_NAV_BREAKPOINT && <TabNav />}
        </>
    );
};

export default Header;
