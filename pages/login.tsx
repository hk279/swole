import type { NextPage } from "next";
import Button from "../components/_generic/Button";
import Input from "../components/_generic/Input";
import styles from "../styles/pages/Login.module.scss";

const Login: NextPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <Input placeholder="Email" type="email" />
                <Input placeholder="Password" type="password" />
                <div className={styles.actions}>
                    <Button text="Log In" primary success />
                    <Button text="Forgot Password?" link />
                </div>
                <hr className={styles.divider} />
                <Button text="Log In with Google" primary />
                <hr className={styles.divider} />
                <Button text="Sign up" link />
            </div>
        </div>
    );
};

export default Login;
