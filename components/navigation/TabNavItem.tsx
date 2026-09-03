import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import classnames from "classnames/bind";
import styles from "../../styles/components/navigation/TabNavItem.module.scss";

const cx = classnames.bind(styles);

interface Props {
    route: string;
    icon: IconDefinition;
}

const TabNavItem = ({ route, icon }: Props) => {
    const router = useRouter();

    return (
        <li
            className={cx("tabNavItem", { active: router.pathname === route })}
            onClick={() => router.push(route)}
        >
            <FontAwesomeIcon icon={icon} />
        </li>
    );
};

export default TabNavItem;
