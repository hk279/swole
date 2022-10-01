import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import styles from "../../styles/components/navigation/NavBarItem.module.scss";

interface Props {
    route: string;
    label: string;
    icon?: IconDefinition;
}

const NavBarItem = ({ route, label, icon }: Props) => {
    const router = useRouter();

    return (
        <li
            className={`${styles.navBarItem} ${router.pathname === route && styles.active}`}
            onClick={() => router.push(route)}
        >
            {icon && <FontAwesomeIcon className={styles.navBarItemIcon} icon={icon} />}
            {label}
        </li>
    );
};

export default NavBarItem;
