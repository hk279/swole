import TabNavItem from "./TabNavItem";
import styles from "../../styles/components/navigation/TabNav.module.scss";
import {
  faChartSimple,
  faDumbbell,
  faList,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  return (
    <ul className={styles.tabNav}>
      <TabNavItem icon={faList} route="/private/log" />
      <TabNavItem icon={faDumbbell} route="/private/exercises" />
      <TabNavItem icon={faChartSimple} route="/private/stats" />
      <TabNavItem icon={faPlus} route="private/workouts/new-workout" />
    </ul>
  );
};

export default NavBar;
