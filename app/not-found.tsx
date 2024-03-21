import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { NextPage } from "next";
import Flex from "../components/_generic/Flex";
import colors from "../styles/colors.module.scss";
import styles from "../styles/app/Not-found.module.scss";

const NotFound: NextPage = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      className={styles.container}
    >
      <FontAwesomeIcon
        size="5x"
        width={32}
        color={colors.colorError}
        icon={faCircleExclamation}
      />
      <Flex direction="column">
        <h2 className={styles.textContent}>404</h2>
        <h1 className={styles.textContent}>Page not found</h1>
      </Flex>
    </Flex>
  );
};

export default NotFound;
