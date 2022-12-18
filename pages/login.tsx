import type { NextPage } from "next";
import Button from "../components/_generic/Button";
import Divider from "../components/_generic/Divider";
import Input from "../components/_generic/Input";
import styles from "../styles/pages/Login.module.scss";
import { signIn } from "next-auth/react";
import { useState } from "react";

const Login: NextPage = () => {
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const handleSignIn = async () => {
        setIsAuthenticating(true);
        await signIn("github", { callbackUrl: `${window.location.origin}/log` });
        setIsAuthenticating(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <Input placeholder="Email" type="email" />
                <Input placeholder="Password" type="password" />

                <div className={styles.actions}>
                    <Button text="Log In" primary success />
                    <Button text="Forgot Password?" link />
                </div>

                <Divider />

                <Button
                    text="Log in with GitHub"
                    primary
                    onClick={handleSignIn}
                />
                <Button text="Log In with Google" primary disabled isLoading={isAuthenticating} />

                <Divider />

                <Button text="Sign up" link />
            </div>
        </div>
    );
};

export default Login;
