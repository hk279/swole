"use client";

import NavBar from "../navigation/NavBar";
import TabNav from "../navigation/TabNav";
import styles from "../../styles/components/layout/Header.module.scss";
import useViewport from "../../hooks/useViewport";
import { signOut } from "next-auth/react";
import Button from "../_generic/Button";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

export default function Header({ userEmail }: { userEmail: string }) {
  const width = useViewport();

  const TAB_NAV_BREAKPOINT = 1200;
  const HIDE_EMAIL_BREAKPOINT = 800;

  return (
    <>
      {width <= TAB_NAV_BREAKPOINT ? (
        <TabNav />
      ) : (
        <div className={styles.header}>
          {width > TAB_NAV_BREAKPOINT && <NavBar />}

          <div className={styles.auth}>
            {width > HIDE_EMAIL_BREAKPOINT && userEmail}
            <Button
              icon={faSignOut}
              danger
              onClick={() =>
                signOut({ callbackUrl: `${window.location.origin}/login` })
              }
            />
          </div>
        </div>
      )}
    </>
  );
}
