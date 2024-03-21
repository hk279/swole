"use client";

import type { NextPage } from "next";
import Button from "../../components/_generic/Button";
import styles from "../../styles/app/login/Login.module.scss";
import spaces from "../../styles/spaces.module.scss";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Flex from "../../components/_generic/Flex";

const Login: NextPage = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleGithubSignIn = async () => {
    setIsAuthenticating(true);
    await signIn("github", {
      callbackUrl: `${window.location.origin}/private/log`,
    });
    setIsAuthenticating(false);
  };

  return (
    <Flex alignItems="center" justifyContent="center" className={styles.page}>
      <Flex direction="column" gap={spaces.xlarge} className={styles.container}>
        <Button
          isLoading={isAuthenticating}
          text="Log in with GitHub"
          primary
          onClick={handleGithubSignIn}
        />

        <Button text="Log In with Google" primary disabled />
      </Flex>
    </Flex>
  );
};

export default Login;
