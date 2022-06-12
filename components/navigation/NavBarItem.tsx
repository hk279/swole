import { useRouter } from "next/router";
import styles from "../../styles/components/navigation/NavBarItem.module.scss";

type Props = { label: string; route: string; disabled?: boolean };

function NavBarItem({ label, route, disabled = false }: Props) {
    const router = useRouter();

    return (
        <li
            className={`${styles.navBarItem} ${router.pathname === route && styles.active}`}
            onClick={() => router.push(route)}
        >
            {label}
        </li>
    );
}

export default NavBarItem;
