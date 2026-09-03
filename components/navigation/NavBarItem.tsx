import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import classnames from "classnames/bind";
import styles from "../../styles/components/navigation/NavBarItem.module.scss";

const cx = classnames.bind(styles);

interface Props {
    route: string;
    label: string;
    icon?: IconDefinition;
}

const NavBarItem = ({ route, label, icon }: Props) => {
    const router = useRouter();

    return (
        <li
            className={cx("navBarItem", { active: router.pathname === route })}
            onClick={() => router.push(route)}
        >
            {icon && <FontAwesomeIcon className={styles.navBarItemIcon} icon={icon} />}
            {label}
        </li>
    );
};

export default NavBarItem;
