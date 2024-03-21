import NavBarItem from "./NavBarItem";
import styles from "../../styles/components/navigation/NavBar.module.scss";
import {
  faChartSimple,
  faDumbbell,
  faList,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  return (
    <ul className={styles.navBar}>
      <NavBarItem label="Log" icon={faList} route="/private/log" />
      <NavBarItem
        label="Exercises"
        icon={faDumbbell}
        route="/private/exercises"
      />
      <NavBarItem label="Stats" icon={faChartSimple} route="/private/stats" />
      <NavBarItem
        label="New Workout"
        icon={faPlus}
        route="/private/workouts/new-workout"
      />
    </ul>
  );
};

export default NavBar;
