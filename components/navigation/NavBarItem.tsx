import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../styles/components/navigation/NavBarItem.module.scss";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  route: string;
  label: string;
  icon?: IconDefinition;
}

const NavBarItem = ({ route, label, icon }: Props) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const className = `${styles.navBarItem} ${
    pathname === route && styles.active
  }`;

  return (
    <li className={className} onClick={() => push(route)}>
      {icon && (
        <FontAwesomeIcon
          width={16}
          className={styles.navBarItemIcon}
          icon={icon}
        />
      )}
      {label}
    </li>
  );
};

export default NavBarItem;
