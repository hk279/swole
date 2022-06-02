import { useRouter } from "next/router";
import styles from "../../styles/components/navigation/NavItem.module.scss";

type Props = { label: string; route: string; disabled?: boolean };

function NavItem({ label, route, disabled = false }: Props) {
    const router = useRouter();

    return (
        <li
            className={`${styles.navItem} ${router.pathname === route && styles.active}`}
            onClick={() => router.push(route)}
        >
            {label}
        </li>
    );
}

export default NavItem;
