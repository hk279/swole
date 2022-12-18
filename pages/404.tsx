import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { NextPage } from "next";
import Layout from "../components/layout/Layout";
import Flex from "../components/_generic/Flex";
import colors from "../styles/colors.module.scss";
import styles from "../styles/pages/404.module.scss";

const NotFound: NextPage = () => {
    return (
        <Layout>
            <Flex alignItems="center" justifyContent="center" className={styles.container}>
                <FontAwesomeIcon size="5x" color={colors.colorError} icon={faCircleExclamation} />
                <Flex direction="column">
                    <h2 className={styles.textContent}>404</h2>
                    <h1 className={styles.textContent}>Page not found</h1>
                </Flex>
            </Flex>
        </Layout>
    );
};

export default NotFound;
