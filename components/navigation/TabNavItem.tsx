import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import styles from "../../styles/components/navigation/TabNavItem.module.scss";

interface Props {
    route: string;
    label?: string;
    disabled?: boolean;
    icon: IconDefinition;
}

const TabNavItem = ({ route, icon, disabled = false }: Props) => {
    const router = useRouter();

    return (
        <li
            className={`${styles.tabNavItem} ${router.pathname === route && styles.active}`}
            onClick={() => router.push(route)}
        >
            <FontAwesomeIcon icon={icon} />
        </li>
    );
};

export default TabNavItem;
