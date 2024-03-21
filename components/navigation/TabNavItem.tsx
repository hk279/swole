import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter } from "next/navigation";
import styles from "../../styles/components/navigation/TabNavItem.module.scss";

interface Props {
  route: string;
  label?: string;
  disabled?: boolean;
  icon: IconDefinition;
}

const TabNavItem = ({ route, icon }: Props) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const className = `${styles.tabNavItem} ${
    pathname === route && styles.active
  }`;

  return (
    <li className={className} onClick={() => push(route)}>
      <FontAwesomeIcon width={16} icon={icon} />
    </li>
  );
};

export default TabNavItem;
