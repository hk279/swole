import { useRouter } from "next/router";
import styles from "../../styles/components/navigation/TabNavItem.module.scss";

type Props = { label: string; route: string; disabled?: boolean };

function TabNavItem({ label, route, disabled = false }: Props) {
    const router = useRouter();

    return (
        <li
            className={`${styles.tabNavItem} ${router.pathname === route && styles.active}`}
            onClick={() => router.push(route)}
        >
            {label}
        </li>
    );
}

export default TabNavItem;
